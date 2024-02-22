import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from 'axios';

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [requestResponse, setRequestResponse] = useState({
    textMessage: '',
    alertClass: ''
  });
  const navigate = useNavigate();

  if (isRegistered) {
    setTimeout(() => {
      navigate("/login");
    }, 2000); 
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Register</h1>
        <p className="mb-4">
          Already have an account?{" "}
          <Link to="/login" className="link-primary">
            Login here
          </Link>
        </p>
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            first_name: Yup.string().required("First Name is required"),
            last_name: Yup.string().required("Last Name is required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            axios.post(`http://127.0.0.1:8000/api/register/`, values)
              .then(response => {
                setRequestResponse({
                  textMessage: 'Registration successful',
                  alertClass: 'alert alert-success'
                });
                setIsRegistered(true);
                setSubmitting(false);
              })
              .catch(error => {
                setRequestResponse({
                  textMessage: 'Registration failed',
                  alertClass: 'alert alert-danger'
                });
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                />
                <ErrorMessage name="first_name" component="div" className="error-message text-danger" />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <Field
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                />
                <ErrorMessage name="last_name" component="div" className="error-message text-danger" />
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
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
