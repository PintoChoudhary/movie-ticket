import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function Movies({ movie }) {
  const { Title, Plot, Poster } = movie;

  return (
    <div className="card h-100" style={{ backgroundColor: "#343a40", color: "#fff" }}>
      <img src={Poster} className="card-img-top" alt={Title} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      <div className="card-body">
        <h5 className="card-title">{Title}</h5>
        <p className="card-text">{Plot}</p>
      </div>
      <div className="card-footer">
        <div className="d-flex justify-content-center">
          <Link className="btn btn-primary" to={`/theatre?title=${Title}&poster=${Poster}` }>
            <FaCartPlus /> Book Tickets
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Movies;
