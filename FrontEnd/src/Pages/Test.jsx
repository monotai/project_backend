import React, { useState } from "react";

import { createUser } from "../control/index.js"; // Adjust the import path as necessary

export default function Test() {
  const formData = {
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    email: "john@example.com",
    phonenumber: "123456789",
    password: "securePassword123",
    profile_image_url: "https://example.com/images/johndoe.png"
  };

  // You need to define createUser or import it if it's from another file
  const handleCreateUser = async () => {
    try {
      const response = await createUser(formData);
      console.log("User created successfully:", response);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page to verify the setup.</p>
      <p>test users api</p>
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
}