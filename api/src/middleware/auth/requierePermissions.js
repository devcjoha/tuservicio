import permissions from "../../config/permissions.json" with { type: "json" };

export function requirePermission(actionId) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ error: "No autenticado" });
      }

      const role = user.role;
      const rolePermissions = permissions.roles[role] || [];
      const extraPermissions = user.permissions || [];

      // Combinar permisos del rol + permisos extra
      const allPermissions = [...rolePermissions, ...extraPermissions];

      const allowed = allPermissions.includes(actionId);

      if (!allowed) {
        return res.status(403).json({ error: "No tienes permiso para esta acción" });
      }

      next();
    } catch (error) {
      console.error("Error en requirePermission:", error);
      res.status(500).json({ error: "Error interno de permisos" });
    }
  };
};