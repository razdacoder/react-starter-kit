import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default api;
