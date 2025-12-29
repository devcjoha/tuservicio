export const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Acceso denegado: se requiere rol superadmin" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error en autorización" });
  }
};