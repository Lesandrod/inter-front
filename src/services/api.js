import { nodeApi, goApi } from "../http.commons";

export async function login(username, password) {
  const { data } = await nodeApi.post("/login", { username, password });
  localStorage.setItem("token", data.token);
  return data.token;
}

export async function factorizeQR(matrix) {
  const { data } = await goApi.post("/qr", { matrix });
  return data;
}
