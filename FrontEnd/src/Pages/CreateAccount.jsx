import React, { useState } from "react";
import { getUserByName, createUser } from "../control.js";

const CreateAccount = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username && password) {
            const newUser = { username: username, password: password };
            const existingUser = await getUserByName(username);
            if (!existingUser) {
                try {
                    const response = await createUser(newUser);
                    if (response) {
                        alert("Account created successfully!");
                        window.location.href = "/login";
                    } else {
                        alert("Error creating account. Please try again.");
                    }
                } catch (error) {
                    console.error("Error creating user:", error);
                    alert("An error occurred while creating the account. Please try again.");
                }
            }
            else {
                alert("Username already exists. Please choose a different username.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    }

    return (
        <div className="create-account-container">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Account</button>
            <a href="/login">Already have an account? Login</a>
        </form>
        </div>
    );
};

export default CreateAccount;