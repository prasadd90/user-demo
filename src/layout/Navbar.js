import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div>Welcome Admin</div>
      <div ><a href="/login" className="menu-link" style={{color:'black',fontStyle:'oblique'}}>Logout</a></div>
    </div>
  );
}

export default Navbar;
