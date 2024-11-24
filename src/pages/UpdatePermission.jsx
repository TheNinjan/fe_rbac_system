import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdatePermission = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });
  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}permissions/${id}`;
        const response = await axios.get(url);
        setInitialValues({
          name: response.data.name,
          description: response.data.description,
        });
      } catch (error) {
        console.error("Error fetching permission data:", error);
        alert("Failed to fetch permission details. Please try again.");
      }
    };

    fetchPermission();
  }, [id]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters long"),
  });

  const handleSubmit = async (values) => {
    try {
      const url = `${import.meta.env.VITE_API_URL}permissions/update-permission/${id}`;
      await axios.put(url, values); 
      alert("Permission updated successfully!");
      navigate("/permissions"); 
    } catch (error) {
      console.error("Error updating permission:", error);
      alert("Failed to update permission. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Update Permission</h2>
      <div className="card mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          {initialValues.name ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true} 
            >
              {({ isSubmitting }) => (
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
                        placeholder="Enter permission name"
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
                      htmlFor="description"
                      className="col-sm-3 col-form-label text-end"
                    >
                      Description
                    </label>
                    <div className="col-sm-9">
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Enter permission description"
                      />
                      <ErrorMessage
                        name="description"
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
                      {isSubmitting ? "Updating..." : "Update Permission"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <p>Loading permission details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePermission;
