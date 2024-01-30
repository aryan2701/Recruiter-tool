// src/services/api.js
import axios from 'axios';

const baseURL = 'https://recruiter-tool-t5ex.onrender.com/'; // Update with your backend URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
