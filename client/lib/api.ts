export const API_URL = "http://localhost:4000/api";


export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message ||"Error en la petición");
  }

  return res.json();
};