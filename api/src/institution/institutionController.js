import Institution from "../models/Institution.js";
import permissions from "../config/permissions.json" with { type: "json" };
import User from "../models/User.js"

export const createInstitution = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, type, email, phone, address, rif, logo } = req.body;

    // Crear institución
      const newInstitution = await Institution.create({ 
      name, 
      type, 
      email, 
      phone, 
      address, 
      rif, 
      logo, 
      ownerId: userId 
    });

    // Actualizar rol del usuario a "owner"
    const user = await User.findByIdAndUpdate(userId);
    if (user.role !== "owner") {
      user.role = "owner";
      user.permissions = permissions.roles["owner"];
      await user.save();
    }

    res.status(201).json({
      message: "Institución creada correctamente",
      institution: newInstitution,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    });
  } catch (error) {
    console.error("Error en createInstitution:", error);
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