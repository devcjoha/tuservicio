"use client";
import { useCompanies } from "@/context/CompanyContext";
import { useAuth } from "@/hooks/useAuth";
import DashOwner from "@/components/dashboards/DashOwner";
import { LoadingCard } from "@/components/feedbacks/LoadingCard";


export default function OwnerDashboard() {
  const { user, loading:userLoading } = useAuth()
  const { companies, loading: companiesLoading } = useCompanies();

  if (companiesLoading || userLoading) {
    return <LoadingCard message="Obteniendo información" />;
  }

  return (
    user?.role === "owner" ? (
      <section className="dashboard-user w-full">

        <h1>Panel del Owner de {user?.name} </h1>
        <DashOwner company={companies[0]} />
      </section>)
      : (null)
  )
};