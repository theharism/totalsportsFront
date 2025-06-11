import axios from 'axios';

// Default config for the axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PROXY_URL || ' https://0b38-154-208-41-117.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

export default axiosInstance;