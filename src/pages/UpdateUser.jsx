import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [roles, setRoles] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    role_id: "",
    status: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRolesAndUser = async () => {
      try {
        const rolesUrl = import.meta.env.VITE_API_URL + "roles";
        const userUrl = `${import.meta.env.VITE_API_URL}users/${id}`;

        const rolesResponse = await axios.get(rolesUrl);
        setRoles(rolesResponse.data);

        const userResponse = await axios.get(userUrl);
        const userData = userResponse.data;

        setInitialValues({
          name: userData.name || "",
          email: userData.email || "",
          role_id: userData.role_id || "",
          status: userData.status || "Active",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRolesAndUser();
  }, [id]);

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
      const url = `${import.meta.env.VITE_API_URL}users/update-user/${id}`;
      await axios.put(url, values); 
      alert("User updated successfully!");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Update User</h2>
      <div className="card mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <Formik
            enableReinitialize // Reinitialize form with fetched data
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form>
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Role Field */}
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

                {/* Status Field */}
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

                {/* Submit Button */}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update User"}
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

export default UpdateUser;
