import { UserType } from "@/context/AuthContext";
import { 
  Home, 
  Search, 
  PlusCircle, 
  ClipboardList, 
  Building
} from "lucide-react";

export function getLinksByPermissions(user: UserType | null) {

  const allLinks = [
    {
      href: "/dashboard/user",
      label: "Inicio",
      icon: Home,
      required: [], // todos los roles lo pueden ver
    },
    {
      href: "/dashboard/user/search-services",
      label: "Buscar Servicios",
      icon: Search,
      required: ["REQ_SEARCH"],
    },
    {
      href: "/dashboard/user/new-request",
      label: "Solicitar Servicio",
      icon: PlusCircle,
      required: ["REQ_CREATE"],
    },
    {
      href: "/dashboard/user/requests",
      label: "Mis Solicitudes",
      icon: ClipboardList,
      required: ["REQ_VIEW_STATUS"],
    },
    {
      href: "/dashboard/user/create-institution",
      label: "Ofrecer Servicio",
      icon: Building,
      required: ["INST_CREATE"],
    },
  ];

  return allLinks.filter(link =>
    link.required.every(req => user?.permissions.includes(req))
  );
}