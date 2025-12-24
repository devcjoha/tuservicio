"use client";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { Select } from "@/components/ui/Select";
import { useInstitutions } from "@/context/InstitutionsContext";
import { useAuth } from "@/hooks/useAuth";
import { getLinksByPermissions } from "@/utils/getLinksByPermissions";


export default function OwnerDashboard() {
  const { user } = useAuth()
  const searchLinks = getLinksByPermissions(user, "search")
  const options = searchLinks.map(link => ({
    value: link.href,
    label: link.label
  }));
  const handleFilterChange = (path: string) => {
    console.log("Navegando a o filtrando por:", path);
    // Aquí podrías usar router.push(path) si es navegación
  };
  return (
    user?.role === "owner" ? (
      <section className="dashboard-user w-full">
        <HeaderDashboard />

        <h1>Panel del Owner de {user?.name} </h1>

        <Select className="p-4 bg-secondary-bg"
          label="Filtrar por tipo de búsqueda"
          options={options}
          onChangeValue={handleFilterChange}
          placeholder="¿Qué deseas buscar?">
        </Select>


      </section>)
      : (null)
  )
};