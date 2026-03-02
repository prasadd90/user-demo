import React, { useEffect, useState } from "react";
import { getUsers } from "../services/user.service";
import UserTable from "../Component/UserTable";

function Users() {
  const [myusers, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    debugger;
    const data = await getUsers();
    setUsers(data);
  };

  return (
    <div>
      
      {/* Session global variable for the User table */}
      <UserTable users={myusers} /> 
    </div>
  );
}

export default Users;
