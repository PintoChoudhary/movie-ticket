import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requestResponse, setRequestResponse] = useState({
    textMessage: '',
    alertClass: '',
  });
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate('/'); 
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Login</h1>
        <p>
          New user?{' '}
          <Link to="/register" className="link-primary">
            Register here
          </Link>
        </p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string().required('Password is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios
              .post(`http://127.0.0.1:8000/api/login/`, values)
              .then((response) => {
                setRequestResponse({
                  textMessage: 'Login successful',
                  alertClass: 'alert alert-success',
                });
                localStorage.setItem('token', response.data.access);
                setIsLoggedIn(true);
                setSubmitting(false);
              })
              .catch((error) => {
                setRequestResponse({
                  textMessage: 'Invalid email or password',
                  alertClass: 'alert alert-danger',
                });
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="error-message text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="error-message text-danger" />
              </div>
              {requestResponse.textMessage && (
                <div className={requestResponse.alertClass} role="alert">
                  {requestResponse.textMessage}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
