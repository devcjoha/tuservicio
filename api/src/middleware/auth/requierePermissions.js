
export const requirePermission = (actionId) => {
  return (req, res, next) => {
    try {
     
 const allPermissions = req.user?.permissions || [];
      
   if (!allPermissions.includes(actionId)) {
     return res.status(403).json({
       message: `Sin permisos para realizar esta acción: ${actionId}`,
     });
   }
      next();
    } catch (error) {
      res.status(500).json({ error: "Error interno de permisos" });
    }
  };
};