import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom"; 
import { FaShoppingCart } from "react-icons/fa"; 
import Navbar from "../Components/Navbar";

function TheatrePage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const poster = searchParams.get("poster");
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cinemas/");
        setTheaters(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching theaters.");
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  const selectRandomTheaters = () => {
    const selectedTheaters = [];
    const totalTheaters = theaters.length;
    if (totalTheaters <= 2) {
      return theaters;
    } else {
      while (selectedTheaters.length < 2) {
        const randomIndex = Math.floor(Math.random() * totalTheaters);
        if (!selectedTheaters.includes(theaters[randomIndex])) {
          selectedTheaters.push(theaters[randomIndex]);
        }
      }
      return selectedTheaters;
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-4">{error}</div>;
  }

  const randomTheaters = selectRandomTheaters();

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Theatres</h2>
        <p className="text-muted">
          This movie is only available at these theatres
        </p>
        {randomTheaters.map((theater) => (
          <div key={theater.cinema_id} className="row mb-3 pd-5 mt-5">
            <div className="col-6">
              <div className="card" style={{ backgroundColor: "#343a40", color: "#fff" }}>
                <div className="card-body">
                  <h5 className="card-title">{theater.cinema_name}</h5>
                  <p className="card-text">
                    Address: {theater.address}, {theater.city}, {theater.state}{" "}
                    - {theater.postcode}
                  </p>
                  <p className="card-text">
                    Distance: {theater.distance.toFixed(2)} km
                  </p>
                  <Link to={`/bookseat?title=${title}&theatreName=${theater.cinema_name}&poster=${poster}`} className="btn btn-primary">
                    <FaShoppingCart /> Book Seat
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TheatrePage;
