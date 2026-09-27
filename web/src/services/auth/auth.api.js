import { apiRequest } from "../api.js";

export function login(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: credentials,
  });
}

export function getCurrentUser(signal) {
  return apiRequest("/auth/me", {
    method: "GET",
    signal,
  });
}

export function logout() {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}
