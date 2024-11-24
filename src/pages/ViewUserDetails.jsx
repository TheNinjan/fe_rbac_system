import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewUserDetails = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}users/details/${id}`;
        const response = await axios.get(url);
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">User Details</h2>
      <div className="card mx-auto shadow-lg" style={{ maxWidth: "800px" }}>
        <div className="card-header text-white bg-primary">
          <h5 className="mb-0">{user.user_name}</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>Email:</strong>
            <p className="card-text">{user.email}</p>
          </div>

          <div className="mb-3">
            <strong>Status:</strong>
            <p className="card-text">{user.status}</p>
          </div>

          <div className="mb-3">
            <strong>Role:</strong>
            <p className="card-text">{user.role_name}</p>
          </div>

          {user.role_permissions && user.role_permissions.length > 0 ? (
            <>
              <h6 className="mt-4">Assigned Permissions</h6>
              <ul className="list-group list-group-flush">
                {user.role_permissions.map((permission, index) => (
                  <li key={index} className="list-group-item">
                    {permission}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-muted mt-3">No role or permissions assigned.</p>
          )}
        </div>

        <div className="card-footer text-center">
          <button className="btn btn-outline-primary" onClick={() => window.history.back()}>
            Back to User List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetails;
