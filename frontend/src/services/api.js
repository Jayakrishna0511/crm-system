// Axios instance with token auto-injection
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://crm-system-vk24.onrender.com/api',
  // baseURL: 'https://crm-system-vk24.onrender.com/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
