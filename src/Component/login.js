import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  loginUser } from "../services/user.service";
 
function LoginUser() {
  const navigate = useNavigate();
   
  const [formData, setFormData] = useState({
    Password: "",
    Email: "",
  });

   
  useEffect(() => {
    
  });
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
    
    try {
          
           const result = await loginUser(formData.Email, formData.Password);
           console.log("Login API called with email: " + result);//+formData.Email+formData.Password
           debugger;
           if(result.status === 200) {
            alert("User Logged In Successfully");
            navigate("/users"); 
           }
           else{
            alert("User Logged In failed: Invalid email or password");
           }
        //    navigate("/users");
        console.log("Login Result:", result);
      // redirect to users page
    } catch (error) {
      //console.error(error);
      alert("Error creating user: " + error.message);
    }
  };

  return (
    <div>
      
<div className="form-container">
  <h2 className="form-title">Login User</h2>

  <form onSubmit={handleSubmit} className="admin-form">

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
      <label>Password</label>
      <input
        type="password"
        name="Password"
        value={formData.Password}
        onChange={handleChange}
        required
      />
    </div>
   

     

    <div className="form-actions">
      <button type="submit" className="btn-primary" id="addUserBtn" style={{width:'100px'}}>
        Login
      </button>
    </div>

  </form>
</div>

    </div>
  );
}

export default LoginUser;

