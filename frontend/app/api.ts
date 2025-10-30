import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.INTERNAL_API_URL  // côté serveur (Docker)
    : process.env.NEXT_PUBLIC_API_URL; // côté navigateur

const api = axios.create({
  baseURL: baseURL + "api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;