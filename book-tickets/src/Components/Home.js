import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="container-fluid p-0"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ maxWidth: "800px", height: "500px" }}
      >
        <div className="row justify-content-center text-center text-white">
          <div className="col-md-8">
            <h1 className="display-4">Welcome to MovieShowcase!</h1>
            <p className="lead">
              Your ultimate destination for booking movie tickets.
            </p>
            <hr className="my-4" />
            <p>
              We offer a wide range of movies from various genres. Whether
              you're a fan of action, romance, comedy, or thriller, we have
              something for everyone.
            </p>
            <p>Don't miss out on the latest blockbusters!</p>
            <Link
              className="btn btn-primary btn-lg mt-4"
              to="/movies"
              style={{
                borderRadius: "20px", 
                padding: "10px 30px",
                backgroundColor: "white", color: "black",
                border: "2px solid dark", }}
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
