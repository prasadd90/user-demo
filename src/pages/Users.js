import React, { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import UserTable from "../Component/UserTable";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  return (
    <div>
      
      {/* Session global variable for the User table */}
      <UserTable users={users} /> 
    </div>
  );
}

export default Users;
