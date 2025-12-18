import Institution from "../models/Institution.js";

export const createInstitution = async (req, res) => {
  try {
    const institution = await Institution.create({
      ...req.body,
      ownerId: req.user.id,
    });
    //CAMBIAR EL ROL DEL USER A OWNER
    const savedInstitution = await institution.save();
    res.status(201).json({
      message: "Institución creada correctamente",
      institution: savedInstitution,
    });
  } catch (error) {
    console.error("Error al crear institución:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find();

    res.json({
      message: "Instituciones obtenidas",
      institutions,
    });
  } catch (error) {
    console.error("Error al obtener instituciones:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);

    if (!institution) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución obtenida",
      institution,
    });
  } catch (error) {
    console.error("Error al obtener institución:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!institution) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución actualizada",
      institution,
    });
  } catch (error) {
    console.error("Error al actualizar institución:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deleteInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndDelete(req.params.id);

    if (!institution) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución eliminada",
    });
  } catch (error) {
    console.error("Error al eliminar institución:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};