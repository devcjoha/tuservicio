"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardRouter() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si todavía estamos validando la cookie de sesión, no hacemos nada
    if (isLoading) return;

    // Si terminó de cargar y no hay usuario, al login
    if (!user) {
      router.push("/login");
      return;
    }

    // Mapeo de rutas según el rol definido en tu controlador
    const routes: Record<string, string> = {
      user: "/dashboard/user",
      owner: "/dashboard/owner",
      admin: "/dashboard/admin",
      superadmin: "/dashboard/superadmin",
    };
    const target = routes[user.role];
    
    if (target) {
      router.push(target);
    }
  }, [user, isLoading, router]);

  return <p>Cargando sesión...</p>;
}