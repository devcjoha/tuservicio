import { UserType } from "@/context/AuthContext";
// 1. Importamos el tipo generado automáticamente
import { ActionType } from "@/types/permissions";
import {
  Home,
  Search,
  MapPinCheck,
  Award,
  Pencil,
  Trash2,
  CirclePlus,
  Store,
  ToggleRight,
  NotebookTabs,
  Users,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  UserCircle,
  Briefcase,
  AlertCircle
} from "lucide-react";

export type LinkCategory = "main" | "search" | "management" | "admin" | "account";

type Link = {
  href: string;
  label: string;
  icon: React.ElementType;
  // 2. Usamos ActionType para que los permisos sean estrictos
  required?: ActionType | ActionType[];
  category: LinkCategory;
};

const allLinks: Link[] = [
  // --- CATEGORÍA: MAIN / USER ---
  {
    href: "/dashboard",
    label: "Panel Principal",
    icon: Home,
    category: "main"
  },
  {
    href: "/dashboard/user/search-services",
    label: "Explorar Servicios",
    icon: Search,
    required: "REQ_SERV_SEARCH",
    category: "main"
  },
  {
    href: "/dashboard/user/nearby",
    label: "Servicios por Zona",
    icon: MapPinCheck,
    required: "REQ_SERV_FILTER_LOCATION",
    category: "main"
  },

  // --- CATEGORÍA: MANAGEMENT (Owner / Empresa) ---
  {
    href: "/dashboard/user/create-company",
    label: "Crear mi empresa",
    icon: Store,
    required: "COMPANY_CREATE",
    category: "management"
  },
  {
    href: "/dashboard/owner/my-company",
    label: "Mi Empresa",
    icon: Store,
    required: "COMPANY_VIEW_OWN",
    category: "management"
  },
  {
    href: "/dashboard/owner/services",
    label: "Mis Servicios",
    icon: NotebookTabs,
    required: "SERV_VIEW_OWN",
    category: "management"
  },
  {
    href: "/dashboard/owner/services/new",
    label: "Nuevo Servicio",
    icon: CirclePlus,
    required: "SERV_CREATE",
    category: "management"
  },
  {
    href: "/dashboard/owner/employees",
    label: "Equipo / Empleados",
    icon: Users,
    required: "EMP_CREATE",
    category: "management"
  },
  {
    href: "/dashboard/owner/stats",
    label: "Estadísticas",
    icon: BarChart3,
    required: "STATS_VIEW_COMPANY",
    category: "management"
  },

  // --- CATEGORÍA: ADMIN (Global Management) ---
  {
    href: "/dashboard/admin/users",
    label: "Gestión de Usuarios",
    icon: ShieldCheck,
    required: "USER_VIEW_ALL",
    category: "admin"
  },
  {
    href: "/dashboard/admin/companies",
    label: "Control de Empresas",
    icon: Briefcase,
    required: "COMPANY_VIEW_ALL",
    category: "admin"
  },
  {
    href: "/dashboard/admin/disputes",
    label: "Disputas / Soporte",
    icon: AlertCircle,
    required: "DISPUTE_RESOLVE",
    category: "admin"
  },

  // --- CATEGORÍA: ACCOUNT ---
  {
    href: "/dashboard/profile",
    label: "Mi Perfil",
    icon: UserCircle,
    required: "AUTH_PROFILE",
    category: "account"
  },
  {
    href: "/dashboard/settings",
    label: "Configuración",
    icon: Settings,
    category: "account"
  }
];

/**
 * Filtra los links basándose en los permisos reales del usuario
 */
export function getLinksByPermissions(user: UserType | null, category?: LinkCategory) {
  if (!user) return [];

  const filtered = allLinks.filter((link) => {
    // Si no requiere permiso, es público para logueados
    if (!link.required) return true;

    // Si es un array de permisos, debe tener al menos uno (OR)
    if (Array.isArray(link.required)) {
      return link.required.some((perm) => user.permissions.includes(perm));
    }

    // Si es un solo permiso
    return user.permissions.includes(link.required);
  });

  // Si se pide una categoría específica, filtramos por ella
  if (category) {
    return filtered.filter((link) => link.category === category);
  }

  return filtered;
};
// export function getLinksByPermissions(user: UserType | null, category?: LinkCategory) {
//   if (!user) return [];
//   const perms = new Set(user.permissions);

//   return allLinks.filter(link => {
//     // Primero filtramos por categoría si se solicita
//     if (category && link.category !== category) return false;

//     // Luego filtramos por permisos
//     if (!link.required) return true;
//     if (Array.isArray(link.required)) {
//       return link.required.every(req => perms.has(req));
//     }
//     return perms.has(link.required);
//   });
// };