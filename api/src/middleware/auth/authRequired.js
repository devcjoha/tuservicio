import jwt from "jsonwebtoken";
import { jwt_secret } from "../../../config.js";
import Permissions from "../../models/Permissions.js";
import User from "../../models/User.js";

export const authRequired = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    // 1. Primero verificamos el token para obtener el ID y el ROL
    const decoded = jwt.verify(token, jwt_secret);

    // 2. Buscamos al usuario en la DB para confirmar que existe
    const user = await User.findById(decoded.userId).lean();
    if (!user)
      return res.status(401).json({ message: "Usuario no encontrado" });

    // 3. Obtenemos los permisos frescos de Atlas usando el rol del token (o del usuario)
    const permDoc = await Permissions.findOne().lean();
    const freshPermissions = permDoc.roles[user.role] || [];

    // Añadimos permisos frescos y eliminamos campos sensibles
    user.permissions = freshPermissions;
    delete user.password;
    delete user.emailVerificationToken;
    delete user.emailVerificationExpires;

    // Inyectamos el objeto completo en req.user
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: "Sesión inválida o expirada" });
  }
};