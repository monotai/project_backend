import axios from 'axios';

const API_BASE_URL = '/api';

export const storeLocally = (key, data) => {
  try {
    // Convert data to string before saving
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (error) {
    console.error("Failed to store data in localStorage:", error);
  }
};

export const getLocally = (key) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (jsonData) {
        return JSON.parse(jsonData);
    }
    return null; // Return null if no data found
    }
    catch (error) {
    console.error("Failed to retrieve data from localStorage:", error);
    return null; // Return null in case of error
    }
};

export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        throw error; // Rethrow for further handling
    }
};

export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, newUser);
        return true;
    } catch (error) {
        console.error("Error creating user:", error);
        return false; // Indicate failure to create user
    }
};

export const fetchUserById = async (userId, setUser = () => {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        setUser(response.data);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

export const getUserById = async (userId) => {
    const nullUser = {user_id: 0, name: "", password: "none"}
    try {
        const allUsers = await fetchAllUsers();
        const user = allUsers.find(user => user.user_id === userId);
        if (user) {
            return user;
        } else {
            console.error("User not found");
            return nullUser;
        }
    } catch (error) {
        console.error("Error fetching users by name:", error);
        return nullUser;
    }
}

export const getUserByName = async (name) => {
    try {
        const allUsers = await fetchAllUsers();
        const user = allUsers.find(user => user.name === name);
        if (user) {
            return user;
        } else {
            console.error("User not found");
            return null;
        }
    } catch (error) {
        console.error("Error fetching users by name:", error);
        return null;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const allUsers = await fetchAllUsers();
        
        const user = allUsers.find(user => user.email === email);
        if (user) {
            return user;
        }
        else {
            console.error("User not found");
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching users by email:", error);
        return null;
    }
}

const updateEntity = async (url, updatedData, setData) => {
    try {
        const response = await axios.put(url, updatedData);
        setData((prevData) =>
            prevData.map((item) => (item.id === response.data.id ? response.data : item))
        );
    } catch (error) {
        console.error(`Error updating entity at ${url}:`, error.response?.data || error.message);
    }
};

export const updateUser = (userId, updatedUser, setUsers) =>
    updateEntity(`${API_BASE_URL}/users/${userId}`, updatedUser, setUsers);


export const deleteUser = async (userId, setUsers = () => {}) => {
    if (!userId) {
        console.error("Invalid userId:", userId);
        return true;
    }
    try {
        await axios.delete(`${API_BASE_URL}/users/${userId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        throw error; // Rethrow for further handling if needed
    }
};

export const fetchAllData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/data`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all data:", error);
    }
};

//const { type, data }
export const addUserData = async (userId, newData, setData = () => {}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/${userId}/data`, newData);
        setData((prevData) => [...prevData, response.data]);
    } catch (error) {
        console.error("Error adding user data:", error);
    }
};

export const fetchUserData = async (userId, setData = () => {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/data`);
        setData(response.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

export const fetchUserDataById = async (userId, dataId, setData = () => {}) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/data/${dataId}`);
        setData(response.data);
    } catch (error) {
        console.error("Error fetching user data by ID:", error);
    }
};

export const updateUserData = async (userId, dataId, updatedData, setData = () => {}) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${userId}/data/${dataId}`, updatedData);
        setData((prevData) =>
            prevData.map((data) => (data.id === dataId ? response.data : data))
        );
    } catch (error) {
        console.error("Error updating user data:", error);
    }
};

export const deleteUserData = async (userId, dataId, setData = () => {}) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${userId}/data/${dataId}`);
        setData((prevData) => prevData.filter((data) => data.id !== dataId));
    } catch (error) {
        console.error("Error deleting user data:", error);
    }
};

export const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("File upload failed");
    }
    const result = await response.json();
    return result.message.split(" ")[1];
  };

export const handleFileGet = async (filename) => {
    try {
      const response = await fetch(`${API_BASE_URL}/upload/${filename}`);
      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Failed to fetch file:", error);
      return null;
    }
  };

export const handleDeleteFile = async (filename) => {
    try {
        await fetch(`${API_BASE_URL}/upload/${filename}`, { method: "DELETE" });
    } catch (error) {
        console.error("Failed to delete file:", error);
    }
};