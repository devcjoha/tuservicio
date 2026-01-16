import RefreshToken from "../../models/RefreshToken.js";
import { isProduction } from "../../../config.js";

export const createSession = async (res, userId, currentSession) => {
  // 1. Limpieza: Borramos tokens viejos de este mismo dispositivo 🚫📱
  await RefreshToken.deleteMany({
    userId,
    device: currentSession.device,
  });

  // 2. Preparación: Generamos el nuevo ID y la expiración ⏳
  const refreshId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // 3. Persistencia: Guardamos en la base de datos 💾
  await RefreshToken.create({
    refreshId,
    userId,
    expiresAt,
    device: currentSession.device,
    ip: currentSession.ip,
  });

  // 4. Entrega: Seteamos la cookie segura 🍪
  res.cookie("refresh_id", refreshId, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
  });

  return refreshId;
};