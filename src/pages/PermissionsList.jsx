import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PermissionsList = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + "permissions";
        const response = await axios.get(url);
        setPermissions(response.data);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this permission?"
    );

    if (confirmDelete) {
      try {
        const url = `${import.meta.env.VITE_API_URL}permissions/${id}`;
        await axios.delete(url); 
        setPermissions(permissions.filter((permission) => permission.id !== id));
        alert("Permission deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete permission.");
      }
    }
  };
  return (
    <div className="flex-grow-1 bg-light">
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Permissions List</h2>
          <Link to="/add-permission" className="btn btn-primary">
            Add New Permission
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Permissions ID</th>
                <th>Permissions Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.length > 0 ? (
                permissions.map((permission, index) => (
                  <tr key={permission.id}>
                    <td>{index + 1}</td>
                    <td>{permission.id}</td>
                    <td>{permission.name}</td>
                    <td>{permission.description}</td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/update-permission/${permission.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(permission.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No permissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PermissionsList;
