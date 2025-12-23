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

type Link = {
  href: string;
  label: string; icon: React.ElementType;
  required?: string | string[]; // puede ser string o array 
};

const allLinks: Link[] = [
  {
    href: "/dashboard/user",
    label: "Inicio",
    icon: Home
  },
  {
    href: "/dashboard/user/search-services",
    label: "Buscar Servicios",
    icon: Search,
    required: "REQ_SEARCH"
  },
  {
    href: "/dashboard",
    label: "Buscar servicios",
    icon: MapPinCheck,
    required: "REQ_FILTER_LOCATION"
  },
  {
    href: "/dashboard",
    label: "Buscar servicios",
    icon: UserRoundSearch,
    required: "REQ_FILTER_TYPE"
  },
  {
    href: "/dashboard",
    label: "Buscar servicios",
    icon: Award,
    required: "REQ_FILTER_POPULARITY"
  },
  {
    href: "/dashboard/user/new-request",
    label: "Solicitar Servicio",
    icon: Handshake,
    required: "REQ_CREATE"
  },
  {
    href: "/dashboard/user/rate-request",
    label: "Calificar Servicio",
    icon: UserStar,
    required: "REQ_RATE"
  },
  {
    href: "/dashboard/user/requests",
    label: "Mis Solicitudes",
    icon: ClipboardList,
    required: "REQ_VIEW_STATUS"
  },
  {
    href: "/dashboard/user/cancel-request",
    label: "Cancelar Solicitud",
    icon: UserRoundX,
    required: "REQ_CANCEL"
  },
  {
    href: "/dashboard/user/create-institution",
    label: "Crear Empresa",
    icon: HandHeart,
    required: "INST_CREATE"
  },
  // OWNER
  {
    href: "/dashboard/owner/institution/:id/edit-institution",
    label: "Editar Empresa",
    icon: Pencil,
    required: "INST_EDIT"
  },
  {
    href: "/dashboard/owner/institution/:id/delete-institution",
    label: "Eliminar Empresa",
    icon: Trash2,
    required: "INST_DELETE"
  },
  {
    href: "/dashboard/owner/institution/:id",
    label: "Ver Mi Empresa",
    icon: Store,
    required: "INST_VIEW_OWN"
  },
  {
    href: "/dashboard/owner/new-service",
    label: "Nuevo Servicio",
    icon: CirclePlus,
    required: "SERV_CREATE"
  },
  {
    href: "/dashboard/owner/delete-service",
    label: "Eliminar Servicio",
    icon: Trash2,
    required: "SERV_DELETE"
  },
  {
    href: "/dashboard/owner",
    label: "Mi Servicios",
    icon: NotebookTabs,
    required: "SERV_VIEW_OWN"
  },
  {
    href: "/dashboard/owner",
    label: "Activar/Desactivar Servicio",
    icon: ToggleRight,
    required: "SERV_TOGGLE_ACTIVE"
  },
  //Faltaría:   
      // "EMP_CREATE",
      // "EMP_EDIT",
      // "EMP_DELETE",

      // "REQ_VIEW_INSTITUTION",
      // "REQ_ASSIGN",
      // "REQ_UPDATE_STATUS",
      // "REQ_ACCEPT",
      // "REQ_REJECT",

      // "STATS_VIEW_INSTITUTION"
];

export function getLinksByPermissions(user: UserType | null) {
  if (!user) return []; const perms = new Set(user.permissions);
  return allLinks.filter(link => {
    if (!link.required)
      return true; // si no requiere permisos → todos lo ven 
    if (Array.isArray(link.required)) { return link.required.every(req => perms.has(req)); } return perms.has(link.required);
  });
};