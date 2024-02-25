import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt,FaHistory } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <RiMovie2Fill className="me-2" /> MovieShowcase
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item"></li>
          </ul>
          <div className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <div className="navbar-nav ms-auto">
              <Link className="nav-link mr-1" to="/booking">
                  <FaHistory /> My Booking
                </Link>
              <button className="btn btn-danger" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
            ) : (
              <div className="navbar-nav ms-auto">
                <Link className="nav-link" to="/login">
                  <FaSignInAlt /> Log In
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
