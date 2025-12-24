"use client";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { Select } from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { getLinksByPermissions } from "@/utils/getLinksByPermissions";


export default function UserDashboard() {
  const { user } = useAuth();
   const searchLinks = getLinksByPermissions(user, "search");

   // Transformamos los links al formato que espera el Select
   const options = searchLinks.map(link => ({
     value: link.href,
     label: link.label
   }));
 
   const handleFilterChange = (path: string) => {
     console.log("Navegando a o filtrando por:", path);
     // Aquí podrías usar router.push(path) si es navegación
   };
 
   return (
     <div className="p-4 bg-secondary-bg">
       <Select 
         label="Filtrar por tipo de búsqueda"
         options={options} 
         onChangeValue={handleFilterChange}
         placeholder="¿Qué deseas buscar?"
       />
     </div>
   );
};