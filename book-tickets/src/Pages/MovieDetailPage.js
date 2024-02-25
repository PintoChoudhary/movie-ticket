import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";

function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movie details.");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">{error}</div>
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="container mt-4">Movie not found!</div>
      </>
    );
  }

  const {
    Title,
    Plot,
    Poster,
    Director,
    Actors,
    Genre,
    Released,
    Runtime,
    Language,
    Awards,
    imdbRating,
    imdbVotes,
  } = movie;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card mb-3" style={{ backgroundColor: "#343a40", color: "#fff" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={Poster} className="img-fluid rounded-start" alt={Title} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{Title}</h5>
                <p className="card-text">{Plot}</p>
                <p className="card-text"><strong>Director:</strong> {Director}</p>
                <p className="card-text"><strong>Actors:</strong> {Actors}</p>
                <p className="card-text"><strong>Genre:</strong> {Genre}</p>
                <p className="card-text"><strong>Release Date:</strong> {Released}</p>
                <p className="card-text"><strong>Runtime:</strong> {Runtime}</p>
                <p className="card-text"><strong>Language:</strong> {Language}</p>
                <p className="card-text"><strong>Awards:</strong> {Awards}</p>
                <p className="card-text"><strong>IMDb Rating:</strong> {imdbRating}</p>
                <p className="card-text"><strong>IMDb Votes:</strong> {imdbVotes}</p>
                <div className="d-flex justify-content-center mt-4">
                  <Link className="btn btn-primary" to={`/theatre?title=${Title}&poster=${Poster}` }>
                    <FaCartPlus /> Book Tickets
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetailPage;
