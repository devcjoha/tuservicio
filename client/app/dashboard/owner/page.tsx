"use client";
import { useCompanies } from "@/context/CompanyContext";
import { useAuth } from "@/hooks/useAuth";
import DashOwner from "@/components/dashboards/DashOwner";
import { LoadingCard } from "@/components/feedbacks/LoadingCard";
import { ErrorCard } from "@/components/feedbacks/ErrorCard";
import { EmptyCard } from "@/components/feedbacks/EmptyCard";

export default function OwnerDashboard() {
  const { user, loading:userLoading } = useAuth()
  const { companies, loading: companiesLoading, error } = useCompanies();

  if (companiesLoading || userLoading) {
    return <LoadingCard message="Cargando compañías..." />;
  }
  if (error) { return <ErrorCard message={error} />; }
  
  if (!companies || companies.length === 0)
    return <EmptyCard message="No hay compañías disponibles" />;

  return (
    user?.role === "owner" ? (
      <section className="dashboard-user w-full">

        <h1>Panel del Owner de {user?.name} </h1>
        <DashOwner company={companies[0]} />
      </section>)
      : (null)
  )
};