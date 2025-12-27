"use client";
import { useAuth } from "@/hooks/useAuth";


export default function OwnerDashboard() {
  const { user } = useAuth()
 
  const handleFilterChange = (path: string) => {
    console.log("Navegando a o filtrando por:", path);
    // Aquí podrías usar router.push(path) si es navegación
  };
  return (
    user?.role === "owner" ? (
      <section className="dashboard-user w-full">

        <h1>Panel del Owner de {user?.name} </h1>

      </section>)
      : (null)
  )
};