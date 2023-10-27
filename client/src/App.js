import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Home from "./components/Home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import PageNotFound from "./components/PageNotFound";
import About from "./components/About";
import "react-toastify/dist/ReactToastify.css";
import Farmerdata from "./components/DataDisplay";
import Form from "./components/Form";
import Footer from "./components/Footer";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import AdminNavbar from "./components/AdminNavbar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ApmcLogin from "./components/ApmcLogin";
import AdminLogin from "./components/AdminLogin";
import ApmcRegister from "./components/ApmcRegister";

const App = () => {
  const token = Cookies.get("token");
  let role;

  try {
    const decodedToken = jwt_decode(token);
    if (decodedToken && decodedToken.role) {
      role = decodedToken.role;
    } else {
      role = "defaultRole";
    }
  } catch (error) {
    console.error("Error decoding the token:", error);
    role = "defaultRole";
  }

  const [roleState, setRole] = useState(role);
  console.log(roleState);

  return (
    <>
      {role === "admin" ? (
        <AdminNavbar roleState={roleState} setRole={setRole} />
      ) : (
        <Navbar roleState={roleState} setRole={setRole} />
      )}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/form" element={<Form />} />
        <Route path="/datadisplay" element={<Farmerdata />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login roleState={roleState} setRole={setRole} />}
        />
        <Route exact path="/apmc/login" element={<ApmcLogin />} />
        <Route exact path="/apmc/register" element={<ApmcRegister />} />

        <Route exact path="/admin" element={<AdminLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
