// src/services/api.js
import axios from 'axios';

const baseURL = 'http://localhost:3001'; // Update with your backend URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
