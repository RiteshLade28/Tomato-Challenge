import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/adminLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.error) {
      // window.alert("Invalid Credentials");
      toast.error("Invalid Credentials");
    } else {
      Cookies.set("token", data.token);
      const role = jwtDecode(data.token).role;
      // window.alert("Login Successful");
      toast.success("Login Successful");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-3">
          <h2>Login For Admin</h2>
          <form method="POST" className="login-form mt-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                type="tel"
                id="email"
                name="email"
                className="form-control"
                autoComplete="off"
                placeholder="Your Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                autoComplete="off"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group form-button">
              <input
                type="submit"
                name="signin"
                id="signin"
                className="btn btn-primary"
                value="Log In"
                onClick={loginUser}
              />
            </div>
          </form>
          <p className="mt-3">
            New user? <NavLink to="/signup">Register here</NavLink>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
