"use client";
import { DashboardCard } from "@/components/ui/Card"
import { useCompanies } from "@/context/CompanyContext";
import { useAuth } from "@/hooks/useAuth";
import { HandHeart } from "lucide-react";
import { LoadingCard } from "../feedbacks/LoadingCard";
import Image from "next/image";

export default function DashOwner() {
  const { user, loading: userLoading } = useAuth();
  const { company, loading: companiesLoading } = useCompanies();

 
  // Si todavía está cargando la API, mostramos un estado de carga local
  if (companiesLoading || userLoading) {
    return (
      <div className="flex justify-center p-10">
        <LoadingCard message="Cargando datos de tu empresa..." />
      </div>
    );
  };
  console.log("DASHOWNER", company);
  
  // Si terminó de cargar pero no hay empresa (por ejemplo, error de red)
  if (!company) {
    return <p>No se encontró información de la empresa.</p>;
  };

  return (
    <section className="dashboard-owner w-full">
      <h1>Panel del Owner COMPONENT de {user?.name} </h1>
      <Image src={company.logo?.url || "/default-company-logo.png"} width={100} height={100} alt="logo-company"/>
      <DashboardCard
        title={company.name}
        description="Gestión de servicios activos"
        icon={<HandHeart className="text-gray-800" />}
        status={company.status}
        actions={[
          { label: "Editar", onClick: () => console.log("Editar institución") },
          {
            label: "Eliminar",
            onClick: () => console.log("Eliminar institución"),
          },
        ]}
        className="lg:w-100 bg-background"
      ></DashboardCard>
    </section>
  );
};