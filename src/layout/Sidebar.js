import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <ul>
        <li>Dashboard</li>

        <li onClick={() => setOpenUserMenu(!openUserMenu)}>
          Users ▾
        </li>

        {openUserMenu && (
  <ul className="submenu">
    <li>
      <Link to="/users" className="menu-link">All Users</Link>
    </li>
    <li><Link to="/add" className="menu-link">Add User</Link></li>
  </ul>
)}


        <li>Settings</li>
        <li>Reports</li>
      </ul>
    </div>
  );
}

export default Sidebar;
