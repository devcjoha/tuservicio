import { UserType } from "@/context/AuthContext";
import {
  Home,
  Search,
  ClipboardList,
  Handshake,
  HandHeart,
  UserRoundX,
  UserStar,
  MapPinHouse,
  MapPinCheck,
  UserRoundSearch,
  Award,
  Pencil,
  Trash2,
  CirclePlus,
  Store,
  ToggleRight,
  NotebookTabs
} from "lucide-react";

export type LinkCategory = "main" | "search" | "management" | "account";

type Link = {
  href: string;
  label: string;
  icon: React.ElementType;
  required?: string | string[]; // puede ser string o array 
  category: LinkCategory;
};

const allLinks: Link[] = [
  {
    href: "/dashboard/user",
    label: "Inicio",
    icon: Home,
    category: "main"
  },
  {
    href: "/dashboard/user/search-services",
    label: "Todos los servicios",
    icon: Search,
    required: "REQ_SEARCH",
    category: "search"
  },
  {
    href: "/dashboard",
    label: "Servicios por zona",
    icon: MapPinCheck,
    required: "REQ_FILTER_LOCATION",
    category: "search"
  },
  {
    href: "/dashboard",
    label: "Servicios por categoría",
    icon: UserRoundSearch,
    required: "REQ_FILTER_TYPE",
    category: "search"
  },
  {
    href: "/dashboard",
    label: "Servicios más populares",
    icon: Award,
    required: "REQ_FILTER_POPULARITY",
    category: "search"
  },
  {
    href: "/dashboard/user/new-request",
    label: "Solicitar Servicio",
    icon: Handshake,
    required: "REQ_CREATE",
    category: "main"
  },
  {
    href: "/dashboard/user/rate-request",
    label: "Calificar Servicio",
    icon: UserStar,
    required: "REQ_RATE",
    category: "main"
  },
  {
    href: "/dashboard/user/requests",
    label: "Mis Solicitudes",
    icon: ClipboardList,
    required: "REQ_VIEW_STATUS",
    category: "main"
  },
  {
    href: "/dashboard/user/cancel-request",
    label: "Cancelar Solicitud",
    icon: UserRoundX,
    required: "REQ_CANCEL",
    category: "main"
  },
  {
    href: "/dashboard/user/create-company",
    label: "Crear Empresa",
    icon: HandHeart,
    required: "COMPANY_CREATE",
    category: "main"
  },
  // OWNER
  {
    href: "/dashboard/owner/company/:id/edit-company",
    label: "Editar Empresa",
    icon: Pencil,
    required: "COMPANY_EDIT",
    category: "main"
  },
  {
    href: "/dashboard/owner/company/:id/delete-company",
    label: "Eliminar Empresa",
    icon: Trash2,
    required: "COMPANY_DELETE",
    category: "main"
  },
  {
    href: "/dashboard/owner/company/:id",
    label: "Ver Mi Empresa",
    icon: Store,
    required: "COMPANY_VIEW_OWN",
    category: "main"
  },
  {
    href: "/dashboard/owner/new-service",
    label: "Nuevo Servicio",
    icon: CirclePlus,
    required: "SERV_CREATE",
    category: "main"
  },
  {
    href: "/dashboard/owner/delete-service",
    label: "Eliminar Servicio",
    icon: Trash2,
    required: "SERV_DELETE",
    category: "main"
  },
  {
    href: "/dashboard/owner",
    label: "Mi Servicios",
    icon: NotebookTabs,
    required: "SERV_VIEW_OWN",
    category: "main"
  },
  {
    href: "/dashboard/owner",
    label: "Activar/Desactivar Servicio",
    icon: ToggleRight,
    required: "SERV_TOGGLE_ACTIVE",
    category: "main"
  },
  //Faltaría:   
  // "EMP_CREATE",
  // "EMP_EDIT",
  // "EMP_DELETE",

  // "REQ_VIEW_Company",
  // "REQ_ASSIGN",
  // "REQ_UPDATE_STATUS",
  // "REQ_ACCEPT",
  // "REQ_REJECT",

  // "STATS_VIEW_Company"
];
export function getLinksByPermissions(user: UserType | null, category?: LinkCategory) {
  if (!user) return [];
  const perms = new Set(user.permissions);

  return allLinks.filter(link => {
    // Primero filtramos por categoría si se solicita
    if (category && link.category !== category) return false;

    // Luego filtramos por permisos
    if (!link.required) return true;
    if (Array.isArray(link.required)) {
      return link.required.every(req => perms.has(req));
    }
    return perms.has(link.required);
  });
};

// export function getLinksByPermissions(user: UserType | null) {
//   if (!user) return []; const perms = new Set(user.permissions);
//   return allLinks.filter(link => {
//     if (!link.required)
//       return true; // si no requiere permisos → todos lo ven
//     if (Array.isArray(link.required)) { return link.required.every(req => perms.has(req)); } return perms.has(link.required);
//   });
// };