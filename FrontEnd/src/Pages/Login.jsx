
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Style/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    setError("No user found. Please sign up first.");
    return;
  }

  if (
    formData.email === storedUser.email &&
    formData.password === storedUser.password
  ) {
    // Save essential info to localStorage
    localStorage.setItem("userId", Date.now()); 
    localStorage.setItem("firstName", storedUser.fName);
    localStorage.setItem("lastName", storedUser.lName);

    alert("Login successful!");
    navigate("/home");
  } else {
    setError("Incorrect username or password. Please try again.");
    setFormData ({ email: "", password:" "});
  }
};

  return (
    <div className="container">
      <h1 className="facebook-title">facebooks</h1>

      <div className="auth-container">

        {error && <p className="error-message">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email or Phone number"  value={formData.email} onChange={handleChange}required
          />

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required
          />

          <button type="submit" className="login-button">Login</button>
          <a href="#" style={{ fontSize: '12px', textAlign: 'center',marginTop: '10px' }}>Forgotten password?</a>

        </form>

        <hr className="divider" />
        <Link to="/create-account">
          <button className="signup-button">Create New Account</button>

        </Link>
      </div>
    </div>
  );
};
export default Login;
