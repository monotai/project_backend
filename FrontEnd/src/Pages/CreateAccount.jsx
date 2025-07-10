
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../control/index"

import "../Style/Auth.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "null",
    password: "",
    profile_image_url:"null"
  });
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!formData.firstname || !formData.lastname || !formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    createUser(formData);
    // alert(`Welcome, ${formData.lName}! Your account has been created.`);

    navigate("/login");

    // Clear form
    setFormData({ firstname: "", lastname: "", username: "", email: "", phone: "null", password: "", profile_image_url:"null" });
    createUser(formData)
      .then((response) => {
        console.log("User created successfully:", response);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        setError("Failed to create account. Please try again.");
      });
  };

  

  return (
    <div className="container">
    <h1 className="facebook-title">facebooks</h1>
    <div className="auth-container">
      <h2>Create New Account</h2>

      {error && <p className="error-message">{error}</p>} 

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
        <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        {/* <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required /> */}
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit"  >Submit</button>
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





