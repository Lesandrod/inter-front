import { nodeApi, goApi } from "../http.commons";

// hace login y guarda el token en localStorage
export async function login(username, password) {
  const { data } = await nodeApi.post("/login", { username, password });
  localStorage.setItem("token", data.token);
  return data.token;
}

// envía la matriz a la API de Go y devuelve Q, R y estadísticas
export async function factorizeQR(matrix) {
  const { data } = await goApi.post("/qr", { matrix });
  return data;
}
