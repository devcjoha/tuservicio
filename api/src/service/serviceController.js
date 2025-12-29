import Service from "../models/Service.js";
import Company from "../models/Company.js";

export const createService = async (req, res) => {
  try {
    const { companyId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    const service = await Service.create(req.body);

    res.status(201).json({
      message: "Servicio creado correctamente",
      service,
    });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.json({
      message: "Servicios obtenidos",
      services,
    });
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json({
      message: "Servicio obtenido",
      service,
    });
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json({
      message: "Servicio actualizado",
      service,
    });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    res.json({
      message: "Servicio eliminado",
    });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
