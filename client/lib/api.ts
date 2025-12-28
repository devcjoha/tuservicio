// export const API_URL = "http://localhost:4000/api";


// export async function apiFetch(endpoint: string, options: RequestInit = {}) {
//   const isFormData = options.body instanceof FormData;
//   const headers = {
//     ...(!isFormData && { "Content-Type": "application/json" }),
//     "Cache-Control": "no-cache",
//     ...options.headers,
//   };

//   const res = await fetch(`${API_URL}${endpoint}`, {
//     ...options,
//     headers,
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw new Error(errorData.message ||"Error en la petición");
//   }

//   return res.json();
// };
// lib/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

type ApiOptions = RequestInit & { timeout?: number };

function createTimeoutController(timeout = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return { controller, clear: () => clearTimeout(id) };
}

export async function apiFetch(endpoint: string, options: ApiOptions = {}) {
  const url = `${API_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    "Cache-Control": "no-cache",
    ...(options.headers as Record<string, string> | undefined),
  };

  const timeout = options.timeout ?? 10000;
  const { controller, clear } = createTimeoutController(timeout);
  const signal = (options as any).signal ?? controller.signal;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
      signal,
    });

    const contentType = res.headers.get("content-type") || "";

    // Intentar parsear JSON si aplica
    if (contentType.includes("application/json")) {
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = payload?.message || payload?.error || res.statusText;
        const err: any = new Error(message);
        err.status = res.status;
        err.payload = payload;
        throw err;
      }
      return payload;
    }

    // Fallback para respuestas no JSON (texto, html)
    const text = await res.text();
    if (!res.ok) {
      const err: any = new Error(text || res.statusText);
      err.status = res.status;
      throw err;
    }
    return { data: text };
    
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("La petición fue abortada o excedió el tiempo de espera");
    }
    // Normalizar error
    const message = err?.message || "Error en la petición";
    const error: any = new Error(message);
    error.original = err;
    throw error;
  } finally {
    clear();
  }
};