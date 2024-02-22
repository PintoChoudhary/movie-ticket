import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function Contact() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h2 className="text-center mb-4">Contact Us</h2>
            <p>
              If you have any questions or inquiries, please feel free to contact us using the information provided below:
            </p>
            <ul className="list-unstyled">
              <li><strong>Email:</strong> contact@example.com</li>
              <li><strong>Phone:</strong> 123-456-7890</li>
              <li><strong>Address:</strong> 123 Main St, City, Country</li>
            </ul>
            <p>
              Alternatively, you can fill out the form below and we'll get back to you as soon as possible:
            </p>
            {/* Add your contact form here */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
