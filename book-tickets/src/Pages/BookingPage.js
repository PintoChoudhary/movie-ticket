import React from "react";
import Navbar from "../Components/Navbar";
import { Link,useLocation } from "react-router-dom";

function BookingPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title")||localStorage.getItem('title');
  const poster = searchParams.get("poster")||localStorage.getItem('poster');
  const theatreName = searchParams.get("theatreName")||localStorage.getItem('theatreName');
  const selectedSeatsParam = searchParams.get("selectedSeats")||localStorage.getItem('selectedSeats');
  const selectedSeats = selectedSeatsParam ? selectedSeatsParam.split(",") : [];
  const totalCost = searchParams.get("totalCost")||localStorage.getItem('totalCost');
  const username = localStorage.getItem("username");

  return (
    <>
      <Navbar />
      <div className="container mt-5 w-50">
        <div className="card ticket-card p-4">
          <div className="ticket-header">
            <h4>Hello, {username}!</h4>
            <p>Your Booking</p>
          </div>
          <div className="ticket-body">
            <div className="row">
              <div className="col-md-4">
                {poster && (
                  <img src={poster} alt={title} className="img-fluid h-50" />
                )}
              </div>
              <div className="col-md-8">
                <h3 className="text-secondary mb-2">Movie:</h3>
                <p className="lead">{title}</p>
                <h3 className="text-secondary mb-2">Theatre:</h3>
                <p className="lead">{theatreName}</p>
                <h3 className="text-secondary mb-2">Selected Seats:</h3>
                <p className="lead">{selectedSeats.join(", ")}</p>
                <h3 className="text-secondary mb-2">Total Cost:</h3>
                <p className="lead">₹{totalCost}</p>
              </div>
              <hr />
              <div className="text-center">
                <p>Thank you for your purchase!</p>
                <Link className="btn btn-outline-dark mt-3" to={`/`}>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingPage;
