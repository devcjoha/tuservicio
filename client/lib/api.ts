import { doRefresh } from "./authRefresh";

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
    // 1. Detectamos el 401
    if (res.status === 401) {
      // 1. Rutas que no deben disparar el refresh
      const publicRoutes = ["/auth/login", "/auth/reset-password", "/auth/forgot-password"];
      // 2. Comprobamos si el endpoint actual está en esa lista
      const isPublicRoute = publicRoutes.some(route => endpoint.includes(route));
      // Si es pública, solo lanzamos el error (sin redirigir)
      if (isPublicRoute) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.message || "Error de validación");
      }
      // Si NO es pública, intentamos el refresh usando tu función doRefresh
      try {
        await doRefresh(); // Mutex de authRefresh.ts
        return apiFetch(endpoint, options); // Reintento si el refresh fue exitoso
      } catch (refreshError) {
        // Si doRefresh falla, significa que el refresh token expiró 
        // forzamos la redirección al login
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("session_active");
          window.location.replace("/login?expired=true");
        }
        throw new Error("Sesión expirada");
      }
  
    }
   
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