import { apiRequest } from "../api.js";

export function getEvents(signal) {
  return apiRequest("/events", {
    method: "GET",
    signal,
  });
}

export function getEventById(eventId, signal) {
  return apiRequest(`/events/${encodeURIComponent(eventId)}`, {
    method: "GET",
    signal,
  });
}

export function createEvent(eventData) {
  return apiRequest("/events", {
    method: "POST",
    body: eventData,
  });
}

export function updateEvent(eventId, eventData) {
  return apiRequest(`/events/${encodeURIComponent(eventId)}`, {
    method: "PATCH",
    body: eventData,
  });
}

export function deleteEvent(eventId) {
  return apiRequest(`/events/${encodeURIComponent(eventId)}`, {
    method: "DELETE",
  });
}
