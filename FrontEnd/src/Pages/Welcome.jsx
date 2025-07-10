import { useNavigate } from "react-router-dom";
export default function Welcome() {
    const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <h1>Welcome to Our Social Media Platform!</h1>
      <p>Connect with friends, share your thoughts, and explore the world around you.</p>
      <img src="/images/welcome-image.png" alt="Welcome" className="welcome-image" />
      <p>Get started by logging in or creating an account.</p>
      <a href="/login" className="welcome-link">Login</a>
    </div>
  );
}