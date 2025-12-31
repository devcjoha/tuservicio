export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Acceso denegado: se requiere rol admin" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: true, message: error.message || "Error en autorización" });
  }
};