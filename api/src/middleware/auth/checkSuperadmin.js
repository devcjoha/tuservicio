/**
 * Middleware para autorizar al SUPERADMIN
 */
export const checkSuperadmin = () => {
  return (req, res, next) => {
    const masterId = process.env.MASTER_ADMIN_ID;
   try {
     // 1. Verificación de existencia (inyectado por verifyToken)
     if (!req.user) {
       return res.status(401).json({
         ok: false,
         message: "Identidad no verificada.",
       });
     }

     // 2. Doble validación de Poder Total:
     // Pasa si es tu ID personal (del .env) O si tiene el rol de superadmin
     const isMaster = req.user._id.toString() === masterId;
     const isSuperadmin = req.user.role === "superadmin";

     if (isMaster || isSuperadmin) {
       return next();
     }

     // 3. Bloqueo para cualquier otro rol (Owner, Admin, etc.)
     return res.status(403).json({
       ok: false,
       message: "Acceso restringido: Se requieren privilegios de Superadmin.",
     });
   } catch (error) {}
    res.status(500).json({
      ok: false,
      message: "Error al checkear el rol",
      error: error.message,
    });
  };
};
