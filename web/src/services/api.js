const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

function buildUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_URL}${normalizedPath}`;
}

async function readResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiRequest(path, options = {}) {
  const { body, headers = {}, ...requestOptions } = options;
  const isFormData = body instanceof FormData;
  const requestHeaders = {
    Accept: "application/json",
    ...(!isFormData && body != null ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  const response = await fetch(buildUrl(path), {
    ...requestOptions,
    headers: requestHeaders,
    body: !isFormData && body != null ? JSON.stringify(body) : body,
  });
  const data = await readResponse(response);

  if (!response.ok) {
    const error = new Error(data?.message || `Erreur API (${response.status}).`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
