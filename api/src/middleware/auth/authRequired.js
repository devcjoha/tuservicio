import jwt from "jsonwebtoken";
import { jwt_secret } from "../../../config.js";
import Permissions from "../../models/Permissions.js";
import User from "../../models/User.js";
export const authRequired = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "No autorizado" });

    // 1. Primero verificamos el token para obtener el ID y el ROL
    const decoded = jwt.verify(token, jwt_secret);

    // 2. Buscamos al usuario en la DB para confirmar que existe
    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    // 3. Obtenemos los permisos frescos de Atlas usando el rol del token (o del usuario)
    const permDoc = await Permissions.findOne().lean();
    const freshPermissions = permDoc.roles[user.role] || [];

    // 4. Inyectamos la información en req.user (Esto es lo que lee getUserProfile)
    req.user = {
      id: user._id,
      role: user.role,
      permissions: freshPermissions,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "Sesión inválida o expirada" });
  }
};