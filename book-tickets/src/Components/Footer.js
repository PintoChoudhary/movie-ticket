import React from "react";

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Your Website Name. All Rights Reserved.</p>
        <p>Designed with <span role="img" aria-label="heart">❤️</span> by You</p>
      </div>
    </footer>
  );
}

export default Footer;
