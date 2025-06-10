import React from 'react';
import { getUserByName } from '../control.js';
import { useNavigate } from 'react-router-dom';
const Login = ({setUserId}) => {
    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await getUserByName(username);
        if (user && user.password === password) {
            setUserId(user.user_id); // Update the userId state
            navigate("/"); // Redirect to home page
        } else {
            alert("Invalid username or password!");
        }
    };


    return (
        <div className="login-container">
        <h1>Login Page</h1>
        <form>
            <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" onClick={handleSubmit}>Login</button>
            <a href="/create-account">Create Account</a>
        </form>
        </div>
    );
}

export default Login;