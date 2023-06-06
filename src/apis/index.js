import axios from "axios";

export const backend = "http://localhost:1000"

const api = axios.create({
  baseURL: backend,
  // withCredentials: true,
  headers: {
    token: window.localStorage.getItem("token") || ""
  }
})

export default api