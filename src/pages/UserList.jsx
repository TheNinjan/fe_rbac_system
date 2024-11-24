import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + "users";
        const response = await axios.get(url);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    const url =
      newStatus === "Active"
        ? `${import.meta.env.VITE_API_URL}users/activate-user/${userId}`
        : `${import.meta.env.VITE_API_URL}users/deactivate-user/${userId}`

    try {
      await axios.put(url);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      alert(`User has been ${newStatus.toLowerCase()}d successfully.`);
    } catch (error) {
      console.error(`Error updating status:`, error);
      alert("Failed to update user status.");
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        const url = `${import.meta.env.VITE_API_URL}users/${userId}`;
        await axios.delete(url); 
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="flex-grow-1 bg-light">
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">User List</h2>
          <Link to="/add-user" className="btn btn-primary">
            Add New User
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role_name}</td>
                    <td> {user.status}</td>
                    <td className="d-flex gap-2">
                      <Link
                        to={`/view-user/${user.id}`}
                        className="btn btn-sm btn-info"
                      >
                        View
                      </Link>
                      <Link
                        to={`/update-user/${user.id}`}
                        className="btn btn-sm btn-warning"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                      <button
                        className={`btn btn-sm ${user.status === "Active" ? "btn-danger" : "btn-success"
                          }`}
                        onClick={() => toggleStatus(user.id, user.status)}
                      >
                        {user.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No users found.
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

export default UserList;
