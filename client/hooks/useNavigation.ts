import { useMemo } from "react";
import { PERMISSIONS_ROLES, PERMISSIONS_LINKS } from "@/types/permissions";
import { UserType } from "@/context/AuthContext";

export type Role = keyof typeof PERMISSIONS_ROLES;
export type ActionId = keyof typeof PERMISSIONS_LINKS;

// En useNavigation.ts (Versión dinámica)
export function useNavegation(user: UserType | null) {
  // 1. Calculamos los permisos efectivos (Rol + Extras de la DB)
  const effectivePermissions = useMemo(() => {
    if (!user || !user.role) return new Set<ActionId>();
    // Obtenemos los permisos base del ROL
    const basePermissions = (PERMISSIONS_ROLES[user.role] as unknown as ActionId[]) || [];
    // Combinamos con los permisos individuales que vienen de la DB (user.permissions)
    return new Set<ActionId>([...basePermissions, ...user.permissions]);
  }, [user]);
  
  // 2. Generamos los links para la Sidebar
  const links = useMemo(() => {
    return Object.entries(PERMISSIONS_LINKS)
    .filter(([id]) => effectivePermissions.has(id as ActionId))
    .map(([_, link]) => link)
    .sort((a, b) => a.order - b.order);
  }, [effectivePermissions]);

  /**
    * @param actionIds Un ID o un array de IDs
    * @param mode 'any' (al menos uno) o 'all' (todos)
    */
  const hasPermission = (
    actionIds: ActionId | ActionId[],
    mode: 'any' | 'all' = 'any'
  ) => {
    if (!user) return false;

    // Obtenemos el Set de permisos efectivos
    const basePermissions = (PERMISSIONS_ROLES[user.role] as unknown as ActionId[]) || [];
    const effectivePermissions = new Set([...basePermissions, ...user.permissions]);

    // Convertimos a array si viene un solo string
    const idsToCheck = Array.isArray(actionIds) ? actionIds : [actionIds];

    if (mode === 'any') {
      return idsToCheck.some(id => effectivePermissions.has(id));
    } else {
      return idsToCheck.every(id => effectivePermissions.has(id));
    }
  };

  return { links, hasPermission };
};

// // Helper que ya tienes
// function getLinksById(user: UserType | null) {
//   if (!user) return [];

//   const rolePermissions = PERMISSIONS_ROLES[user.role];
//   const effectivePermissions = new Set<ActionId>([
//     ...rolePermissions,
//     ...user.permissions,
//   ]);

//   return Object.entries(PERMISSIONS_LINKS)
//     .filter(([actionId]) => effectivePermissions.has(actionId as ActionId))
//     .map(([_, link]) => link);
// }

// // Hook que envuelve la lógica
// export function useNavegation(user: UserType | null) {
//   const links = useMemo(() => getLinksById(user), [user]);

//   const hasPermission = (action: ActionId) => {
//     if (!user) return false;
//     const effectivePermissions = new Set<ActionId>([
//       ...PERMISSIONS_ROLES[user.role],
//       ...user.permissions,
//     ]);
//     return effectivePermissions.has(action);
//   };

//   return { links, hasPermission };
// };