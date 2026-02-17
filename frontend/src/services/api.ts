import axios from "axios";
const baseURL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "http://backend:5000/api";
    
export const api = axios.create({
  // In dev: Vite proxy handles /api -> http://localhost:5000
  // In prod: your reverse proxy / container routing should also expose /api
baseURL: `${import.meta.env.VITE_API_URL}/api`,
});