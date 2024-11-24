import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const url = import.meta.env.VITE_API_URL + "roles";
        const response = await axios.get(url); 
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    role_id: Yup.string().required("Role is required"),
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const url = import.meta.env.VITE_API_URL + "users/add-user";
      await axios.post(url, values); 
      alert("User added successfully!");
      navigate("/users"); 
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Add User</h2>
      <div className="card mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <Formik
            initialValues={{
              name: "",
              email: "",
              role_id: "",
              status: "Active",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <div className="mb-3 row align-items-center">
                  <label
                    htmlFor="name"
                    className="col-sm-3 col-form-label text-end"
                  >
                    Name
                  </label>
                  <div className="col-sm-9">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label
                    htmlFor="email"
                    className="col-sm-3 col-form-label text-end"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label
                    htmlFor="role_id"
                    className="col-sm-3 col-form-label text-end"
                  >
                    Role
                  </label>
                  <div className="col-sm-9">
                    <Field
                      as="select"
                      id="role_id"
                      name="role_id"
                      className="form-select"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="role_id"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label
                    htmlFor="status"
                    className="col-sm-3 col-form-label text-end"
                  >
                    Status
                  </label>
                  <div className="col-sm-9">
                    <Field
                      as="select"
                      id="status"
                      name="status"
                      className="form-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add User"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
