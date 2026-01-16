// utils/authRefresh.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"; // ajusta según tu entorno
let refreshing: Promise<void> | null = null;

export async function doRefresh() {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      // devolver el body para que el caller pueda manejar el error
      const body = await res.json().catch(() => ({ message: "Refresh failed" }));
      throw body;
    }
  })();
  try {
    await refreshing;
  } finally {
    refreshing = null;
  }
};