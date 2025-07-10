
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Style/Auth.css";
import { getLocally, getUserByEmail, storeLocally } from "../control";

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
const handleSubmit = async (e) => {
  e.preventDefault();
  const user = await getUserByEmail(formData.email);

  if (!user) {
    setError("No user found. Please sign up first.");
    return;
  }

  if (
    formData.email === user.email &&
    formData.password === user.password
  ) {
    // Save essential info to localStorage
    storeLocally("user", user);
    navigate("/home");
  } else {
    setError("Incorrect username or password. Please try again.");
    setFormData ({ email: "", password:""});
  }
};

  return (
    <div className="container">
      <h1 className="facebook-title">facebooks</h1>
      <div className="auth-container">
        {error && <p className="error-message">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email or Phone number"  value={formData.email} onChange={handleChange}required/>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
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
