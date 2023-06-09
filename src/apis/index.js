import axios from "axios";


// export const backend = "http://192.168.126.224:1000"

export const backend = import.meta.env.DEV ? "http://localhost:1000" :  "https://social-app-v.vercel.app"


const api = axios.create({
  baseURL: backend + "/api/v1",
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