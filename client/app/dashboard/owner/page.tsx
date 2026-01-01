"use client";
import { useCompanies } from "@/context/CompanyContext";
import { useAuth } from "@/hooks/useAuth";
import DashOwner from "@/components/dashboards/DashOwner";
import { LoadingCard } from "@/components/feedbacks/LoadingCard";
import { useModal } from "@/hooks/useModal";


export default function OwnerDashboardPage() {
  const { user, loading:userLoading, clearError } = useAuth()
  const { companies, loading: companiesLoading } = useCompanies();
  const { open } = useModal();

  console.log("OWNER DASH", companies);
  
  const myCompany = companies.length > 0 ? companies[1] : null;
  if (companiesLoading || userLoading) {
    return <LoadingCard message="Obteniendo información" />;
  }
  if (!myCompany && user?.role === "owner") {
    return open({
      title: "Error de autenticación",
      message: "No se encontró información de tu empresa. Contacta a soporte.",
      variant: "error",
      onClose: () => clearError(),
    });
  }
  return (
    user?.role === "owner" ? (
      <section className="dashboard-user w-full">

        <h1>Panel del Owner de {user?.name} </h1>
        <DashOwner company={myCompany} />
      </section>)
      : (null)
  )
};