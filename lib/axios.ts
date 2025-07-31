import axios from 'axios';

// Default config for the axios instance
const axiosInstance = axios.create({
  baseURL: "/api/proxy",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

export default axiosInstance;