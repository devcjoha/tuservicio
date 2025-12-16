import { rolePermissions, ActionId, Role } from "./permissions";

export function can(role: Role, action: ActionId): boolean {
  return rolePermissions[role].includes(action);
}