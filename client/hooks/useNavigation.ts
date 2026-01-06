import { useMemo } from "react";
import { PERMISSIONS_ROLES, PERMISSIONS_LINKS } from "@/types/permissions";
import { UserType } from "@/context/AuthContext";

export type Role = keyof typeof PERMISSIONS_ROLES;
export type ActionId = keyof typeof PERMISSIONS_LINKS;


// Helper que ya tienes
function getLinksById(user: UserType | null) {
  if (!user) return [];

  const rolePermissions = PERMISSIONS_ROLES[user.role];
  const effectivePermissions = new Set<ActionId>([
    ...rolePermissions,
    ...user.permissions,
  ]);

  return Object.entries(PERMISSIONS_LINKS)
    .filter(([actionId]) => effectivePermissions.has(actionId as ActionId))
    .map(([_, link]) => link);
}

// Hook que envuelve la lógica
export function useNavegation(user: UserType | null) {
  const links = useMemo(() => getLinksById(user), [user]);

  const hasPermission = (action: ActionId) => {
    if (!user) return false;
    const effectivePermissions = new Set<ActionId>([
      ...PERMISSIONS_ROLES[user.role],
      ...user.permissions,
    ]);
    return effectivePermissions.has(action);
  };

  return { links, hasPermission };
};