// src/utils/authAxios.js
import axios from 'axios';

const authAxios = axios.create({
  baseURL: '/api', // you can import or define this
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huX2RvZSIsImlhdCI6MTc1MzUwODk2OH0.ht6LIcdvGW6_7HVsMaTfKU7_PlhgGvXerguj5yHs44E';

// Automatically attach token before each request
authAxios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authAxios;
