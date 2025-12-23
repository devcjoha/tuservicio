"use client";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function UserDashboard() {
  const { user } = useAuth();
console.log("Dash USER", user);

  return (
    <section className="dashboard-user w-full">
          <HeaderDashboard />
    
      <div className="quick-actions">
        <Link href="/dashboard/user/new-request">Solicitar Servicio</Link>
        <Link href="/dashboard/user/requests">Ver Mis Solicitudes</Link>
        <Link href="/dashboard/user/search-services">Buscar Servicios</Link>
        <Link href="/dashboard/user/create-institution">Ofrecer Servicio</Link>
      </div>
 
      {/* Aquí puedes agregar cards, estadísticas, etc. */}
    </section>
  );
};