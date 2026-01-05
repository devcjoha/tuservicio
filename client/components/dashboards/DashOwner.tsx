"use client";
import { DashboardCard } from "@/components/ui/Card"
import { useCompanies } from "@/context/CompanyContext";
import { useAuth } from "@/hooks/useAuth";
import { HandHeart } from "lucide-react";
import { LoadingCard } from "../feedbacks/LoadingCard";

export default function DashOwner() {
  const { user, loading: userLoading } = useAuth();
  const { companies, loading: companiesLoading } = useCompanies();

  const company = companies[0];
  // 2. Si todavía está cargando la API, mostramos un estado de carga local
  if (companiesLoading || userLoading) {
    return (
      <div className="flex justify-center p-10">
        <LoadingCard message="Cargando datos de tu empresa..." />
      </div>
    );
  };
  // 3. Si terminó de cargar pero no hay empresa (por ejemplo, error de red)
  if (!company) {
    return <p>No se encontró información de la empresa.</p>;
  };
  console.log("DASH OWNER components", company);
  return (
    <section className="dashboard-owner w-full">
      <h1>Panel del Owner COMPONENT de {user?.name} </h1>
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