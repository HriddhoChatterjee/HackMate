import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  // Support the token key used by both existing auth screens and the roadmap module.
  const token = localStorage.getItem('hackmate_token') || localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
