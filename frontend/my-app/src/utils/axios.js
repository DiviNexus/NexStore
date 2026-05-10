import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend runs elsewhere
});

// Attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
