import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteStudentById,getStudentList } from "../services/student.service";

function StudentList({ students }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [studentList, setStudentList] = useState([]);

  // ✅ IMPORTANT FIX — Sync students prop when page reloads or comes back
  useEffect(() => {
    debugger;
     loadUsers();
  }, []);

 const loadUsers = async () => {
    debugger;
    const data = await getStudentList();
    setStudentList(data);
  };


  // ✅ Delete user without reload
  async function deleteStudent(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    await deleteStudentById(id);

    // remove deleted student from state
    setStudentList((prev) => prev.filter((student) => student._id !== id));

    alert("Student Deleted Successfully");
  }
    

  // ✅ Filtered students
  const filteredStudents = useMemo(() => {
    return studentList.filter((student) =>
      [
        student.StudentName,
        student.MobileNo,
        student.Email,
        student.City_Village,
        
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, studentList]);

  // ✅ Pagination logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / recordsPerPage);

  return (
    <div className="table-container" style={{width:"100%",overflowX:"auto",borderCollapse:"collapse",minWidth:"1000px"}} >
          <h2 className="table-title">Student List</h2>
    
          {/* Search + Page Size */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
    
            <div>
              Show:
              <select
                value={recordsPerPage}
                onChange={(e) => {
                  setRecordsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
    
          {/* Table */}
          <table className="admin-table" >
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>City</th>
               
                <th>Created</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((user) => (
                  <tr key={user._id}>
                    <td>{user.StudentName}</td>
                    <td>{user.MobileNo}</td>
                    <td>{user.Email}</td>
                    <td>{user.City_Village || "-"}</td>
                    
                    <td>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <Link to={`/addstudent/${user._id}`} className="edit-btn">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="delete-btn" style={{background:"linear-gradient(90deg, #2563eb, #1e40af)",color:"white",border:"none",padding:"5px 10px",cursor:"pointer"}}
                        onClick={() => deleteStudent(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
    
          {/* Pagination */}
          <div style={{ marginTop: "15px" }}>
            <button className="btn-primary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
    
            {[...Array(totalPages)].map((_, index) => (
              <button className="btn-primary"
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                  margin: "0 5px",
                }}
              >
                {index + 1}
              </button>
            ))}
    
            <button className="btn-primary"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
  );
}

export default StudentList;
