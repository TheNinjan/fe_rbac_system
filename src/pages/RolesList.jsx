import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RolesList = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchroles = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + "roles";
        const response = await axios.get(url);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchroles();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?"
    );

    if (confirmDelete) {
      try {
        const url = `${import.meta.env.VITE_API_URL}roles/${id}`;
        await axios.delete(url); 
        setRoles(roles.filter((role) => role.id !== id));
        alert("Role deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete role.");
      }
    }
  };

  return (
    <div className="flex-grow-1 bg-light">
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Role List</h2>
          <Link to="/add-role" className="btn btn-primary">
            Add New Role
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Role ID</th>
                <th>Role Name</th>
                <th>Permisions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>{role.permissions.join(", ")}</td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/update-role/${role.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(role.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No roles found.
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

export default RolesList;
