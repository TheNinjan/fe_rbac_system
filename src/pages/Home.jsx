import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-grow-1 bg-light">
      <section className="container text-center py-5">
        <h2>Welcome to the Admin Dashboard</h2>
        <p className="lead">
          Manage users, roles, and permissions with ease using this intuitive interface.
        </p>
        <Link to={'/users'} className="btn btn-primary btn-lg">
          Get Started
        </Link>
      </section>

      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Users</h5>
                <p className="card-text">View, add, edit, or delete users efficiently.</p>
                <Link to={'/users'} className="btn btn-primary">
                  Go to Users
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Roles</h5>
                <p className="card-text">Define and edit roles with custom permissions.</p>
                <Link to={'/roles'} className="btn btn-primary">
                  Go to Roles
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Manage Permissions</h5>
                <p className="card-text">Assign or modify permissions dynamically.</p>
                <Link to={'/permissions'} className="btn btn-primary">
                  Go to Permissions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
