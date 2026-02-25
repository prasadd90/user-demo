import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser,getUsersById,updateUser } from "../services/user.service";
 import { useParams } from "react-router-dom";
function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user ID from URL params on edit 
  const [formData, setFormData] = useState({
    UserName: "",
    MobileNo: "",
    Email: "",
    City_Village: "",
    ApplicationStatus: "",
    Password: "" // default password for new users
  });

  // Load user data if editing an existing user
 
 // ✅ Load user only once when editing when component mounts or id changes or renders with new id (if user clicks edit different user without going back to list)
  useEffect(() => {
    if (id) {
       const loadUser = async () => {
    const users = await getUsersById(id);   // you can create getUserById API instead
    const selectedUser =users;// users.find((u) => u._id === id);

    if (selectedUser) {
      setFormData(selectedUser);
      
    }
  };
    }
  }, []);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,      // ✅ correct spread usage
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
   console.log("Form Data Submitted:", formData);
    try {
        if(id !=null)
        {
            
            await updateUser(id, formData);
            alert("User Updated Successfully");
        }
        else {await createUser(formData); alert("User Created Successfully");}
        
     
      
      navigate("/users"); // redirect to users page
    } catch (error) {
      //console.error(error);
      alert("Error creating user: " + error.message);
    }
  };

  return (
    <div>
      
<div className="form-container">
  <h2 className="form-title">Add New User</h2>

  <form onSubmit={handleSubmit} className="admin-form">

    <div className="form-group" style={{textAlign:"left"}}>
      <label>User Name</label>
      <input
        type="text"
        name="UserName"
        value={formData.UserName}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group" style={{textAlign:"left"}}>
      <label>Mobile Number</label>
      <input
        type="text"
        name="MobileNo"
        value={formData.MobileNo}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group" style={{textAlign:"left"}}>
      <label>Email</label>
      <input
        type="text"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group" style={{textAlign:"left"}}>
      <label>City / Village</label>
      <input
        type="text"
        name="City_Village"
        value={formData.City_Village}
        onChange={handleChange}
      />
    </div>

    <div className="form-group" style={{textAlign:"left"}}>
      <label>Password</label>
      <input
        type="password"
        name="Password"
        value={formData.Password}
        onChange={handleChange}
        required
      />
    </div>
    {/* <div className="form-group" style={{textAlign:"left"}}>
      <label>Application Status</label>
      <input
        type="text"
        name="ApplicationStatus"
        value={formData.ApplicationStatus}
        onChange={handleChange}
        required
      />
    </div> */}

    <div className="form-group" style={{textAlign:"left"}}>
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
      <button type="submit" className="btn-primary" id="addUserBtn">
        Save User
      </button>
    </div>

  </form>
</div>

    </div>
  );
}

export default AddUser;
