// Use a relative path so the CRA dev server can proxy requests to the API

const API_URL = "/api/users/";
 const addApiUrl = "https://vsnod.onrender.com/api/users/"; 
export const getUsers = async () => {
  try {
    const response = await fetch(addApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
 

export const getUsersById = async (id) => {
  try {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const createUser = async (userData) => {
 // Assuming the same endpoint for POST
 
   console.log("Creating user with data:", addApiUrl, userData);
  const response = await fetch(addApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return await response.json();
};

export const updateUser = async (id, userData) => {
  
  const response = await fetch(`${addApiUrl}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
  };

  export const deleteUserById = async (id) => {
  try {
    const response = await fetch(`${addApiUrl}/delete/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

export const loginUser = async (email, password) => {
  try {
   // http://localhost:3000/api/users/email/nitin@gmail.com/password/password123
   
      

    var response = await fetch(`${addApiUrl}email/${email}/password/${password}`);
    console.log("Login successful:",  response);
    if (!response.ok) {
      throw new Error("Failed to login user");
    }
    
    
    return  response;

  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
  };