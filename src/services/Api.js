import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://api.hypermesh.io/api/', // Ensure backend is running
  headers: {
    'Content-Type': 'application/json',
  },
});

Api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

Api.interceptors.response.use(
  response => response,
  error => {
    console.error("🛑 API Error:", error);
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default Api;