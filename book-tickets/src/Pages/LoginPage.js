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
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <p className="text-center">
                  New user?{' '}
                  <Link to="/register" className="link-primary">
                    Register here
                  </Link>
                </p>
                <Formik
                  initialValues={{
                    username: '',
                    email: '',
                    password: '',
                  }}
                  validationSchema={Yup.object({
                    username: Yup.string().required('Username is required'),
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Email is required'),
                    password: Yup.string().required('Password is required'),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    axios
                      .post(`http://127.0.0.1:8000/api/login/`, {
                        email: values.email,
                        password: values.password,
                      })
                      .then((response) => {
                        setRequestResponse({
                          textMessage: 'Login successful',
                          alertClass: 'alert alert-success',
                        });
                        localStorage.setItem('token', response.data.access);
                        localStorage.setItem('username', values.username);
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
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          placeholder="Enter full name"
                        />
                        <ErrorMessage name="username" component="div" className="error-message text-danger" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter your registered email"
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
                          placeholder="Enter your password"
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
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
