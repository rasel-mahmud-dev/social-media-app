import axios from "axios";


export const backend = "http://localhost:1000/api/v1"

const api = axios.create({
  baseURL: backend,
})

// Add a request interceptor
api.interceptors.request.use((config) => {
  // Modify config object before sending the request
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});


export default api