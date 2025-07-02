
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

import "../Style/Auth.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!formData.fName || !formData.lName || !formData.username || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    alert(`Welcome, ${formData.lName}! Your account has been created.`);

    // Redirect to home page
    navigate("/Sidebar");

    // Clear form
    setFormData({ fullName: "", username: "", email: "", phone: "", password: "" });
  };

  return (
    <div className="container">
    <h1 className="facebook-title">facebooks</h1>
    <div className="auth-container">
      <h2>Create New Account</h2>

      {error && <p className="error-message">{error}</p>} 

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="fName" placeholder="First Name" value={formData.fName} onChange={handleChange} required />
        <input type="text" name="lName" placeholder="Last Name" value={formData.lName} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" >Submit</button>
      </form>
    <div className="sigin-text" style={{ fontSize: '12px', textAlign: 'center',marginTop: '10px' }}>
      <p>Have an account?  
        <span className="text-blue-600">
          <Link to='/'> Sign In</Link>
        </span>
      </p>
    </div>

    </div>
    </div>
  );
};

export default SignUp;





