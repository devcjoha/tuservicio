import Company from "../models/Company.js";
import permissions from "../config/permissions.json" with { type: "json" };
import User from "../models/User.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createCompany = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, type, email, phone, address, rif } = req.body;

    const image = req.file;
    if (!image) {
      return res.status(400).json({ message: "El logo es obligatorio" });
    }
    const imageCloudinary = await uploadImage(image);

    // Crear Compañia
      const newCompany = await Company.create({ 
      name, 
      type, 
      email, 
      phone, 
      address, 
      rif, 
      logo: imageCloudinary.secure_url, 
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
      message: "Empresa creada correctamente",
      company: newCompany,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    });
   
  } catch (error) {
    console.error("Error en createCompany:", error);
    res.status(500).json({ message: "Error en el servidor" || "Error Interno" });
  }
};

// Traer listado de instituciones según rol
export const getCompanies = async (req, res) => {
  
  try {
    const { id } = req.user
    if (!id) return res.status(404).json({ message: "Usuario no autenticado" });
  
    const userDb = await User.findById(id).select("role").lean();
    if (!userDb) return res.status(404).json({ message: "Usuario no encontrado" });
    const { role } = userDb;

    // Superadmin → todas
    if (role === "superadmin") {
      const companies = await Company.find();
      return res.json({ companies }).lean();
    }
    // Admin → todas
    if (role === "admin") {
      const companies = await Company.find();
      return res.json({ companies }).lean();
    }
    // Owner → solo las suyas
    if (role === "owner") {
      const companies = await Company.find({ ownerId: id }).lean();
      return res.json({ companies });
    }
    return res.status(403).json({ message: "No tienes permisos para esta acción" });
  } catch (error) {
    console.error("Error al obtener instituciones:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución obtenida",
      company,
    });
  } catch (error) {
    console.error("Error al obtener Compañia:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución actualizada",
      company,
    });
  } catch (error) {
    console.error("Error al actualizar Compañia:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución eliminada",
    });
  } catch (error) {
    console.error("Error al eliminar Compañia:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};