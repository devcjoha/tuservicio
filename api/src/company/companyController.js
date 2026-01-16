import Company from "../models/Company.js";
import User from "../models/User.js";
import { isProduction } from "../../config.js";
import Permissions from "../models/Permissions.js";
import { generateToken } from "../auth/authController.js";
import { uploadImage } from "../utils/uploadImage.js";

export const createCompany = async (req, res) => {
  try {
    const {
      name,
      type,
      email,
      phone,
      address,
      rif,
      ownerId,
      categories,
      businessModel,
    } = req.body;

    let logoData = { url: "", public_id: null };

    // Si Multer detectó un archivo en el campo "logo"
    if (req.file) {
      const result = await uploadImage(req.file);
      logoData = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    // Crear Compañia
    const newCompany = await Company.create({
      name,
      type,
      email,
      phone,
      address,
      rif,
      categories, // Array de strings ["Plomería", ...]
      businessModel, // "Oficio-Independiente", etc.
      logo: logoData,
      ownerId,
    });

    // Actualizar rol del usuario a "owner"
    const user = await User.findById(ownerId);
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    if (user && user.role !== "owner") {
      //  Buscamos los permisos oficiales de 'owner' en Atlas
      const permDoc = await Permissions.findOne().lean();
      const ownerPermissions = permDoc.roles["owner"];

      //  Actualizamos las propiedades del documento de Mongoose
      user.role = "owner";
      user.permissions = ownerPermissions;

      //  Guardamos los cambios en la DB
      await user.save();
    }
    // Re-generar token con rol 'owner'
    const token = generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
    });
    res.status(201).json({
      message: "Compañía creada correctamente",
      company: newCompany,
      user,
    });
  } catch (error) {
    console.error("Error en createCompany:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

// Traer listado de instituciones según rol
export const getCompanies = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id)
      return res.status(404).json({ message: "Usuario no autenticado" });

    const userDb = await User.findById(_id).select("role").lean();
    if (!userDb)
      return res.status(404).json({ message: "Usuario no encontrado" });
    const { role } = userDb;

    // Superadmin → todas
    if (role === "superadmin") {
      const companies = await Company.find().lean();
      return res.json({ companies });
    }
    // Admin → todas
    if (role === "admin") {
      const companies = await Company.find().lean();
      return res.json({ companies });
    }
    // Owner → solo las suyas
    if (role === "owner") {
      const companies = await Company.find({ ownerId: _id }).lean();
      return res.json({ companies });
    }
    return res
      .status(403)
      .json({ message: "No tienes permisos para esta acción" });
  } catch (error) {
    console.error("Error al obtener instituciones:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { _id } = req.user;

    const company = await Company.find({ ownerId: _id }).lean();

    if (!company) {
      return res.status(404).json({ message: "Compañía no encontrada" });
    }

    res.status(200).json({
      message: "Compañía existente",
      company,
    });
  } catch (error) {
    console.error("Error al obtener Compañía:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    res.json({
      message: "Institución actualizada",
      company,
    });
  } catch (error) {
    console.error("Error al actualizar Compañia:", error);
    res.status(500).json({ error: true, message: error.message });
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
    res.status(500).json({ error: true, message: error.message });
  }
};
