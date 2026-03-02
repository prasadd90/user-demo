import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createStudent, getStudentsById , updateStudent } from "../services/student.service";
 

function AddStudents() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    StudentName: "",
    MobileNo: "",
    Email: "",
    City_Village: "",
    AdharCardNo: "",
    Education: "",
    Address: "",
    id: ""
  });

  // Load user data when editing
  useEffect(() => {
    const loadStudents = async () => {
      if (id) {
        try {
          const selectedStudent = await getStudentsById (id);
          if (selectedStudent) {
            setFormData(selectedStudent);
          }
        } catch (error) {
          console.error("Error loading student:", error);
        }
      }
    };

    loadStudents();
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
      
        
       console.log("Form Data on Submit:", id); // Debug log to verify form data
      
      if (id ===':id') {
            await createStudent(formData);
       alert("Student Created Successfully");
       
      } else {
          console.log("Insert : " + formData);
     await updateStudent(id, formData);
      
     alert("Student Updated Successfully");      
      }

      navigate("/StudentList");
    } catch (error) {
      alert("Error saving student: " + error.message);
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">
          {/* {id ? "Edit Student" : "Add New Student"} */}
          Add New Student
        </h2>

        <form onSubmit={handleSubmit} className="admin-form">

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>User Name</label>
            <input
              type="text"
              name="StudentName"
              value={formData.StudentName}
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
            <label>AdharCardNo</label>
            <input
              type="text"
              name="AdharCardNo"
              value={formData.AdharCardNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: "left" }}>
            <label>Address</label>
            <input
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
              
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

export default AddStudents;