import React, { useEffect, useState } from "react";
import {  getStudentList } from "../services/student.service";
import StudentList from "../Component/UserTable";

function Students() {
  const [objstudentList, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    debugger;
    const data = await getStudentList();
    setStudents(data);
    console.log("Loaded students:", objstudentList); // Debug log to verify data
  };

  return (
    <div>
       
      {/* Session global variable for the Student table */}
      <StudentList students={objstudentList} /> 
    </div>
  );
}

export default Students;
