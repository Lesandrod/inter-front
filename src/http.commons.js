import axios from "axios";

export const nodeApi = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || "http://localhost:3001",
});

export const goApi = axios.create({
  baseURL: import.meta.env.VITE_GO_API_URL || "http://localhost:9000",
});

goApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
