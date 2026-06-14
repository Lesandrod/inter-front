import axios from "axios";

// instancia para la API de Node (login)
export const nodeApi = axios.create({
  baseURL: import.meta.env.VITE_NODE_API_URL || "http://localhost:3001",
});

// instancia para la API de Go (factorización QR)
export const goApi = axios.create({
  baseURL: import.meta.env.VITE_GO_API_URL || "http://localhost:9000",
});

// agrega el token automáticamente a cada request de la API de Go
goApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
