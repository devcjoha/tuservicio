import Institution from "../models/Institution.js";
import Service from "../models/Service.js";

export const isOwnerOrAdmin = async (req, res, next) => {
  try {
    let institutionId = null;

    // ✅ Caso 1: rutas de instituciones → el ID viene en params
    if (req.baseUrl.includes("institutions") && req.params.id) {
      institutionId = req.params.id;
    }

    // ✅ Caso 2: creación de servicios → institutionId viene en el body
    if (req.baseUrl.includes("services") && req.method === "POST") {
      institutionId = req.body.institutionId;
    }

    // ✅ Caso 3: edición/eliminación de servicios → buscar el servicio
    if (req.baseUrl.includes("services") && req.method !== "POST") {
      const service = await Service.findById(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }
      institutionId = service.institutionId;
    }

    if (!institutionId) {
      return res.status(400).json({ message: "No se pudo determinar institutionId" });
    }

    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    // ✅ Superadmin pasa
    if (req.user.role === "superadmin") return next();

    // ✅ Admin pasa
    if (req.user.role === "admin") return next();

    // ✅ Owner pasa
    if (institution.ownerId.toString() === req.user.id) return next();

    return res.status(403).json({ message: "No tienes permisos para esta acción" });
  } catch (error) {
    console.error("Error en isOwnerOrAdmin:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};