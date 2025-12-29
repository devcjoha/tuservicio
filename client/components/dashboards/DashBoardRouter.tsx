"use client";
import { Role } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type DashboardRouterProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function DashboardRouter({ children, className }: DashboardRouterProps) {
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

    // Mapeo de rutas según el rol definido en el controlador
    const routes: Record<Role, string> = {
      user: "/dashboard/user",
      owner: "/dashboard/owner",
      admin: "/dashboard/admin",
      superadmin: "/dashboard/superadmin",
      "": ""
    };
    const target = routes[user.role];
    
    if (target) {
      router.push(target);
    }
  }, [user, isLoading, router]);

  return( 
    <section className={className} >
       {children ?? <p>Cargando sesión...</p>}
    </section>
  );
}