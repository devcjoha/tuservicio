import { useAuth } from "@/hooks/useAuth";
import { HandHeart } from "lucide-react";
import { DashboardCard } from "../ui/Card";

export default function DasAdmin() {
  const { user } = useAuth();
  console.log("DASHUSER", user);
  
 return (
    <section className="dashboard-user w-full">
      <h1>DashAdmin de {user?.name} </h1>
      <DashboardCard
        title="Servicios activos"
        description="Puedes ver los servicios contratados, pendientes de calificar."
        icon={<HandHeart className="text-gray-800"/>}
        status={user?.status}
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