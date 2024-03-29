import React from "react";
import Navbar from "../Components/Navbar";
import { Link, useLocation } from "react-router-dom";

function CheckOutPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const poster = searchParams.get("poster");
  const theatreName = searchParams.get("theatreName");
  const selectedSeats = searchParams.get("selectedSeats").split(",");
  const totalCost = searchParams.get("totalCost");
  let username = localStorage.getItem('username')
  localStorage.setItem('title', title);
  localStorage.setItem('poster', poster);
  localStorage.setItem('theatreName', theatreName);
  localStorage.setItem('selectedSeats', selectedSeats);
  localStorage.setItem('totalCost', totalCost);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card p-4" style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2>Hello {username}</h2>
        <h2>Sucess!!!!!</h2>
        <hr />
          <h2 className="mb-2">Order Summary</h2>
          <div className="mb-4">
            <h3 className="text-secondary mb-3">Movie:</h3>
            <p className="lead">{title}</p>
          </div>
          <div className="mb-3">
            <h3 className="text-secondary mb-3">Theatre:</h3>
            <p className="lead">{theatreName}</p>
          </div>
          <div className="mb-3">
            <h3 className="text-secondary mb-3">Selected Seats:</h3>
            <p className="lead">{selectedSeats.join(", ")}</p>
          </div>
          <div className="mb-3">
            <h3 className="text-secondary mb-3">Total Cost:</h3>
            <p className="lead">₹{totalCost}</p>
          </div>
          <hr />
          <div className="text-center">
            <p>Thank you for your purchase!</p>
            <Link className="btn btn-outline-dark mt-3" to={`/booking?title=${title}&theatreName=${theatreName}&selectedSeats=${selectedSeats.join(", ")}&totalCost=${totalCost}&poster=${poster}`}>
              Confirm Ticket
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOutPage;
