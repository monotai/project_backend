import axios from 'axios';


const API_BASE_URL = '/api'; // Adjust to your backend server

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

// Create a new user
export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, newUser);
        // alert(`Welcome, ${newUser.firstname}! Your account has been created.`);
        return response.data; // return created user
    } catch (error) {
        console.error("Error creating user:", error.response?.data || error.message);
        return null;
    }
};


// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
        return [];
    }
};

// Get user by ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        return null;
    }
};

// Update user
export const updateUser = async (id, updatedUser) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedUser);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error.response?.data || error.message);
        return null;
    }
};

// Delete user
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting user:", error.response?.data || error.message);
        return false;
    }
};

export const createComment = async (newComment) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/comments`, newComment);
        return response.data; // return created comment
    } catch (error) {
        console.error("Error creating comment:", error.response?.data || error.message);
        return null;
    }
};

export const getComments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error.response?.data || error.message);
        return [];
    }
}

export const getCommentById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comment:", error.response?.data || error.message);
        return null;
    }
}

export const updateComment = async (id, updatedComment) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/comments/${id}`, updatedComment);
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error.response?.data || error.message);
        return null;
    }
};

export const deleteComment = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/comments/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting comment:", error.response?.data || error.message);
        return false;
    }
};

export const createFriendship = async (newFriendship) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/friendships`, newFriendship);
        return response.data; // return created friendship
    } catch (error) {
        console.error("Error creating friendship:", error.response?.data || error.message);
        return null;
    }
};

export const getFriendships = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/friendships`);
        return response.data;
    } catch (error) {
        console.error("Error fetching friendships:", error.response?.data || error.message);
        return [];
    }
}

export const getFriendshipById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/friendships/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching friendship:", error.response?.data || error.message);
        return null;
    }
}

export const updateFriendship = async (id, updatedFriendship) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/friendships/${id}`, updatedFriendship);
        return response.data;
    } catch (error) {
        console.error("Error updating friendship:", error.response?.data || error.message);
        return null;
    }
};

export const deleteFriendship = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/friendships/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting friendship:", error.response?.data || error.message);
        return false;
    }
};

export const createMessage = async (newMessage) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/messages`, newMessage);
        return response.data; // return created message
    } catch (error) {
        console.error("Error creating message:", error.response?.data || error.message);
        return null;
    }
};

export const getMessages = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages`);
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error.message);
        return [];
    }
}

export const getMessageById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching message:", error.response?.data || error.message);
        return null;
    }
}

export const updateMessage = async (id, updatedMessage) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/messages/${id}`, updatedMessage);
        return response.data;
    } catch (error) {
        console.error("Error updating message:", error.response?.data || error.message);
        return null;
    }
};

export const deleteMessage = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/messages/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting message:", error.response?.data || error.message);
        return false;
    }
};

export const createNotification = async (newNotification) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/notifications`, newNotification);
        return response.data; // return created notification
    } catch (error) {
        console.error("Error creating notification:", error.response?.data || error.message);
        return null;
    }
};

export const getNotifications = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notifications`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error.response?.data || error.message);
        return [];
    }
}

export const getNotificationById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notifications/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching notification:", error.response?.data || error.message);
        return null;
    }
}

export const updateNotification = async (id, updatedNotification) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/notifications/${id}`, updatedNotification);
        return response.data;
    } catch (error) {
        console.error("Error updating notification:", error.response?.data || error.message);
        return null;
    }
};

export const deleteNotification = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/notifications/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting notification:", error.response?.data || error.message);
        return false;
    }
};

export const createPost = async (newPost) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts`, newPost);
        return response.data; // return created post
    } catch (error) {
        console.error("Error creating post:", error.response?.data || error.message);
        return null;
    }
};

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error.response?.data || error.message);
        return [];
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error.response?.data || error.message);
        return null;
    }
}

export const updatePost = async (id, updatedPost) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${id}`, updatedPost);
        return response.data;
    } catch (error) {
        console.error("Error updating post:", error.response?.data || error.message);
        return null;
    }
};

export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/posts/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting post:", error.response?.data || error.message);
        return false;
    }
};

export const createReaction = async (newReaction) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/reactions`, newReaction);
        return response.data; // return created reaction
    } catch (error) {
        console.error("Error creating reaction:", error.response?.data || error.message);
        return null;
    }
};

export const getReactions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/reactions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reactions:", error.response?.data || error.message);
        return [];
    }
}

export const getReactionById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/reactions/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reaction:", error.response?.data || error.message);
        return null;
    }
}

export const updateReaction = async (id, updatedReaction) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/reactions/${id}`, updatedReaction);
        return response.data;
    } catch (error) {
        console.error("Error updating reaction:", error.response?.data || error.message);
        return null;
    }
};

export const deleteReaction = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/reactions/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting reaction:", error.response?.data || error.message);
        return false;
    }
};

// Upload a file to the server
export const handleFileUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`File upload failed: ${errText}`);
  }

  const result = await response.json();

  // Expect: { message: 'File <filename> uploaded successfully' }
  // So split message to extract filename
  return result.message.split(" ")[1]; // Returns the filename
};

// Get/download file from server
export const handleFileGet = async (filename) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload/${filename}`);

    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob); // Returns URL to use in <img>, <video>, etc.
  } catch (error) {
    console.error("Failed to fetch file:", error);
    return null;
  }
};

// Delete file from server
export const handleDeleteFile = async (filename) => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload/${filename}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete file");
    }

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Failed to delete file:", error);
  }
};
