import { apiRequest } from "../api.js";

export function getClients(signal) {
  return apiRequest("/clients", {
    method: "GET",
    signal,
  });
}

export function getClientById(clientId, signal) {
  return apiRequest(`/clients/${encodeURIComponent(clientId)}`, {
    method: "GET",
    signal,
  });
}

export function createClient(clientData) {
  return apiRequest("/clients", {
    method: "POST",
    body: clientData,
  });
}

export function updateClient(clientId, clientData) {
  return apiRequest(`/clients/${encodeURIComponent(clientId)}`, {
    method: "PATCH",
    body: clientData,
  });
}

export function deleteClient(clientId) {
  return apiRequest(`/clients/${encodeURIComponent(clientId)}`, {
    method: "DELETE",
  });
}
