import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    // req.user ya viene lleno gracias al middleware corregido arriba
    res.json({
      message: "Perfil obtenido",
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        permissions: req.user.permissions, // Permisos frescos de la DB
        status: "active",
      },
    });
  } catch (error) {
    console.error("Error GetUserProfile:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validar roles permitidos
    const validRoles = ["user", "admin", "superadmin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Rol actualizado correctamente",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No se subió ninguna imagen" });

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarPath },
      { new: true }
    );

    res.json({ message: "Avatar actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al subir avatar" });
  }
};