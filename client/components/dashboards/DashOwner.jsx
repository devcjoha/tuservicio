"use client";
import { DashboardCard } from "@/components/ui/Card"

import { useAuth } from "@/hooks/useAuth";
import { HandHeart } from "lucide-react";

export default function DashOwner({company}) {
  const { user } = useAuth();

 return (
    <section className="dashboard-user w-full">
      <h1>Panel del Owner COMPONENT de {user.name} </h1>
      <DashboardCard
        title={`${company?.name}`}
        description="Gestión de servicios activos"
        icon={<HandHeart className="text-gray-800"/>}
        status={company?.status}
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