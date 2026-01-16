"use client";
import DashUser from "@/components/dashboards/DashUser";
import { LoadingCard } from "@/components/feedbacks/LoadingCard";
import { useAuth } from "@/hooks/useAuth";

export default function UserDashboardPage() {
  const { user } = useAuth();


 if (!user) {
    return <LoadingCard message="Obteniendo información de la nueva sesión" />;
  };

  return (
    user?.role === "user" ? (
      <div className="bg-secondary-bg lg:w-1/2 w-full">
        <p>Page User de: {user?.name}</p>
      <DashUser />
      </div>
    ) : (null)
  );
};