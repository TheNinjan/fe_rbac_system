import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateRole = () => {
  const [permissions, setPermissions] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: "",
    permissions: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRoleAndPermissions = async () => {
      try {
        const permissionsUrl = import.meta.env.VITE_API_URL + "permissions";
        const roleUrl = `${import.meta.env.VITE_API_URL}roles/${id}`;

        const permissionsResponse = await axios.get(permissionsUrl);
        setPermissions(permissionsResponse.data);

        const roleResponse = await axios.get(roleUrl);
        const roleData = roleResponse.data;

        setInitialValues({
          name: roleData.name,
          permissions: roleData.permissions,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoleAndPermissions();
  }, [id]);


  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Role name is required")
      .min(3, "Role name must be at least 3 characters long"),
    permissions: Yup.array()
      .of(Yup.string())
      .min(1, "At least one permission must be selected"),
  });

  const handleSubmit = async (values) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}roles/update-role/${id}`;
      await axios.put(url, values);
      alert("Role updated successfully!");
      navigate("/roles");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Update Role</h2>
      <div className="card mx-auto" style={{ maxWidth: "700px" }}>
        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={initialValues}
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
                    Role Name
                  </label>
                  <div className="col-sm-9">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter role name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger mt-1"
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="permissions"
                    className="col-sm-3 col-form-label text-end"
                  >
                    Permissions
                  </label>
                  <div className="col-sm-9">
                    <div className="form-check-group">
                      {permissions.length === 0 ? (
                        <p>Loading permissions...</p>
                      ) : (
                        permissions.map((permission) => (
                          <div
                            className="form-check "
                            key={permission.id}
                          >
                            <Field
                              type="checkbox"
                              id={`permission-${permission.id}`}
                              name="permissions"
                              value={permission.name}
                              className="form-check-input"
                              checked={values.permissions.includes(permission.name)}
                            />
                            <label
                              htmlFor={`permission-${permission.id}`}
                              className="form-check-label"
                            >
                              {permission.name}
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                    <ErrorMessage
                      name="permissions"
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
                    {isSubmitting ? "Updating..." : "Update Role"}
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

export default UpdateRole;
