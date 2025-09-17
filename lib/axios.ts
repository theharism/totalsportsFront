import axios from 'axios';
import { notFound } from "next/navigation";

// Default config for the axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PROXY_URL || 'https://dashgenius.space',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      notFound();
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;