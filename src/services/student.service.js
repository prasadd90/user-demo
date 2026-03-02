// Use a relative path so the CRA dev server can proxy requests to the API

 
 const addApiUrl = "https://vsnod.onrender.com/api/students/"; 

 export const getStudentList = async () => {
  try {
        debugger;
       const response = await fetch(addApiUrl);
       console.log("getStudentList API response:", response);
       
    if (!response.ok) {
      throw new Error("Failed to fetch Students");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
 

 
export const getStudentsById = async (id) => {
  try {
    const response = await fetch(`${addApiUrl}${id}`);  
    if (!response.ok) {
      throw new Error("Failed to fetch Students");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const createStudent = async (StudentData) => {
 // Ass
 alert('created Student API')
 debugger;
   console.log("Creating Student with data:", addApiUrl, StudentData);
  const response = await fetch(addApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(StudentData)
  });
debugger;
  if (!response.ok) {
    throw new Error("Failed to create Student");
  }

  return await response.json();
};

export const updateStudent = async (id, StudentData) => {
  
  alert('Update'+`${addApiUrl}${id}`)
  const response = await fetch(`${addApiUrl}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(StudentData)
  });

  if (!response.ok) {
    throw new Error("Failed to update Student");
  }

  return await response.json();
  };

  export const deleteStudentById = async (id) => {
  try {
    alert(`${addApiUrl}/student/delete/${id}`);
    const response = await fetch(`${addApiUrl}student/delete/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Failed to delete Student");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

// export const loginStudent = async (email, password) => {
//   try {
//    // http://localhost:3000/api/Students/email/nitin@gmail.com/password/password123
   
      

//     var response = await fetch(`${addApiUrl}email/${email}/password/${password}`);
//     console.log("Login successful:",  response);
//     if (!response.ok) {
//       throw new Error("Failed to login Student");
//     }
    
    
//     return  response;

//   } catch (error) {
//     console.error("API Error:", error);
//     return [];
//   }
//   };