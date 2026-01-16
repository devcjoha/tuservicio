//Obtiene  la información de la session
export const trackSession = async (req, res, next) => {
  try {
    // 1. Extraemos la info del dispositivo
    const userAgent = req.headers["user-agent"] || "Desconocido";
    let deviceLabel = "Otro dispositivo";

    if (userAgent.includes("Windows")) deviceLabel = "PC (Windows)";
    else if (userAgent.includes("Android")) deviceLabel = "Móvil (Android)";
    else if (userAgent.includes("iPhone")) deviceLabel = "iPhone";
    else if (userAgent.includes("Macintosh")) deviceLabel = "PC (Mac)";
console.log("SESSION USERAGENT", userAgent);
    // 2. Obtenemos la IP (manejando si estás detrás de un proxy como Render o Vercel)
    // req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0].trim() || // Cabecera estándar de proxy
      req.headers["x-real-ip"] || // Cabecera común en Nginx
      req.socket.remoteAddress;

    // 3. Preparamos el objeto de la sesión
    req.currentSession = {
      device: deviceLabel,
      ip: ip,
      lastLogin: new Date(),
    };
console.log("SESSION CURRENT", req.currentSession);

    next();
  } catch (error) {
    console.error("Error en trackSession middleware:", error);
    next(); // Seguimos adelante aunque falle el registro por seguridad
  }
};