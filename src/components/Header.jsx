import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    alert("Logged out successfully!");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to={'/'} className="navbar-brand fw-bold" href="/">
          Admin Dashboard
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to={'/users'} className="nav-link text-light">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/roles'} className="nav-link text-light" >
                Roles
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/permissions'} className="nav-link text-light" >
                Permissions
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-center align-items-center mt-2 mt-lg-0">
            <button className="btn btn-danger btn-sm btn-lg" onClick={handleLogout}>
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;