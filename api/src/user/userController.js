import User from "../models/User.js";

export const getUserProfile = async (req, res ) => {
 try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }
    res.json({
      message: "Perfil obtenido",
      user,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error en el servidor" });
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