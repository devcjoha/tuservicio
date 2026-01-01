import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getLinksByPermissions, LinkCategory } from "@/utils/getLinksByPermissions";
import { ActionType } from "@/types/permissions";

export function useNavigation() {
  const { user } = useAuth();

  // Memorizamos todos los links permitidos para este usuario
  const allAllowedLinks = useMemo(() => {
    return getLinksByPermissions(user);
  }, [user]);

  /**
   * Obtiene todos los links permitidos
   */
  const getAllLinks = () => allAllowedLinks;

  /**
   * Obtiene links filtrados por una categoría específica
   */
  const getByCategory = (category: LinkCategory) => {
    return allAllowedLinks.filter((link) => link.category === category);
  };

  /**
   * Obtiene un link específico buscando por su ActionType.
   * Útil si quieres poner un botón específico en un lugar exacto.
   */
  const getByAction = (action: ActionType) => {
    return allAllowedLinks.find((link) => link.required === action);
  };

  /**
   * Obtiene un link específico buscando por su ruta (href).
   */
  const getByPath = (path: string) => {
    return allAllowedLinks.find((link) => link.href === path);
  };

  return {
    allLinks: allAllowedLinks,
    getByCategory,
    getByAction,
    getByPath,
    user,
    // Atajo para saber si el usuario tiene algún link de una categoría
    hasCategory: (cat: LinkCategory) => getByCategory(cat).length > 0,
  };
}