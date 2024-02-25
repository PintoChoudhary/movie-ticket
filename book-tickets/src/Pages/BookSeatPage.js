import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Seat.css";

function BookSeat() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const poster = searchParams.get("poster");
  const theatreName = searchParams.get("theatreName");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const bookedSeats = ["A5", "A6", "C7", "C8", "E9", "E10"];

  const toggleSeat = (seat) => {
    if (!bookedSeats.includes(seat)) {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.length * 200;
  };

  const seatRows = ["A", "B", "C", "D", "E"];

  return (
    <>
      <Navbar />
      <div className="book-seat-container">
        <div className="screen">Screen</div>
        <div className="screen-info">Screen This Way</div>
        <ul className="showcase">
          <li>
            <div className="seat"></div>
            <small>N/A</small>
          </li>

          <li>
            <div className="seat selected"></div>
            <small>Selected</small>
          </li>

          <li>
            <div className="seat booked"></div>
            <small>Booked</small>
          </li>
        </ul>

        <div className="seat-map">
          {seatRows.map((row) => (
            <div key={row} className="seat-row">
              <div className="row-label">{row}</div>
              {Array.from({ length: 10 }, (_, index) => {
                const seat = row + (index + 1);
                const isBooked = bookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                return (
                  <div
                    key={index}
                    className={`seat ${isBooked ? "booked" : isSelected ? "selected" : ""}`}
                    onClick={() => toggleSeat(seat)}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="ticket-summary">
          <h3>Ticket Summary</h3>
          <p>Movie: {title}</p>
          <p>Theatre: {theatreName}</p>
          <p>Selected Seats: {selectedSeats.join(", ")}</p>
          <p>Total Price: ₹{calculateTotalPrice()}</p>
          <Link
            to={`/checkout?title=${title}&theatreName=${theatreName}&selectedSeats=${selectedSeats.join(", ")}&totalCost=${calculateTotalPrice()}&poster=${poster}`}
            className="btn btn-primary"
            disabled={selectedSeats.length === 0}
            style={{ pointerEvents: selectedSeats.length === 0 ? "none" : "auto" }}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </>
  );
}

export default BookSeat;
