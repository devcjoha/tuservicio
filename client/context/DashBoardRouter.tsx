"use client";
import { Role } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingCard } from "../components/feedbacks/LoadingCard";

type DashboardRouterProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function DashboardRouter({ children, className }: DashboardRouterProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  console.log("DASH ROUTER", pathname);

  useEffect(() => {

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

    if (target && pathname === "/dashboard") {
      router.push(target);
    }
  }, [user, loading, router, pathname]);

  // Si todavía estamos validando la cookie de sesión, no hacemos nada
  if (loading) { <LoadingCard message={"Cargando sesión..."} />; return; }
  return (
    <section className={className} >
      {children}
    </section>
  );
}