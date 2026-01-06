import { UserType } from "@/context/AuthContext";
import { ActionId, PERMISSIONS_LINKS, PERMISSIONS_ROLES } from "@/types/permissions";

/**
 * Filtra los links basándose en los permisos reales del usuario, YA la estoy usando en el hook
 */
export function getLinksByPermissions(user: UserType | null) {
  if (!user) return [];
  const rolePermissions = PERMISSIONS_ROLES[user.role];
  const effectivePermissions = new Set<ActionId>([...rolePermissions, ...user.permissions,]);
  return Object.entries(PERMISSIONS_LINKS).filter(([actionId]) => effectivePermissions.has(actionId as ActionId)).map(([_, link]) => link);
};