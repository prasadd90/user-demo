import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import "./styles.css";
import './userlist.css'; 
import Users from "./pages/Users";
import AddUser from "./Component/AddUser";
import "./App.css";
import './App.css';
import Login from "./Component/login";
// Import CSS for styling
function App() {
  

  return (
    <div className="App">
       
       {/* <AdminLayout>
     <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
           <Route path="/add" element={<AddUser  />} />
           <Route path="/add/:id" element={<AddUser />} />
        </Routes>
    </AdminLayout> */}

    <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard + Admin Pages */}
        <Route
          path="/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/add" element={<AddUser />} />
                <Route path="/add/:id" element={<AddUser />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
