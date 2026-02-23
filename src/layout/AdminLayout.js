import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-section">
        <Navbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
