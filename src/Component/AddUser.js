import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, getUsersById, updateUser } from "../services/user.service";

function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    UserName: "",
    MobileNo: "",
    Email: "",
    City_Village: "",
    ApplicationStatus: "",
    Password: ""
  });

  // Load user data when editing
  useEffect(() => {
    const loadUser = async () => {
      if (id) {
        try {
          const selectedUser = await getUsersById(id);
          if (selectedUser) {
            setFormData(selectedUser);
          }
        } catch (error) {
          console.error("Error loading user:", error);
        }
      }
    };

    loadUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await updateUser(id, formData);
        alert("User Updated Successfully");
      } else {
        await createUser(formData);
        alert("User Created Successfully");
      }

      navigate("/users");
    } catch (error) {
      alert("Error saving user: " + error.message);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">
          {id ? "Edit User" : "Add New User"}
        </h2>

        <form onSubmit={handleSubmit} className="admin-form">

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>User Name</label>
            <input
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Mobile Number</label>
            <input
              type="text"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>City / Village</label>
            <input
              type="text"
              name="City_Village"
              value={formData.City_Village}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Password</label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Application Status</label>
            <select
              name="ApplicationStatus"
              value={formData.ApplicationStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="In-Process">In-Process</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save User
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddUser;