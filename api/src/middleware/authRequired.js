import jwt from "jsonwebtoken";
import { jwt_secret } from "../../config.js";

export const authRequired = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const decoded = jwt.verify(token, jwt_secret);

    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};