import { apiRequest } from "../api.js";

export function createClient(clientData) {
  return apiRequest("/clients", {
    method: "POST",
    body: clientData,
  });
}
