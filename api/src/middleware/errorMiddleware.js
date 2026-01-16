export const errorHandler = (err, req, res, next) => {
  // 1. EL LOG TÉCNICO (Para ti)
  // Esto diferencia DE DÓNDE viene el error en tu terminal
  console.error(`[${req.method}] ${req.path} >>`, err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Error inesperado";

  // 2. LA TRADUCCIÓN AUTOMÁTICA (Para el Usuario)
  // Aquí mantienes lo que ya tenías de MongoDB/Zod
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `El ${field} ya está registrado.`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Datos inválidos.";
  }

  // 3. EL FILTRO DE SEGURIDAD
  // Si llegamos aquí con un 500, es que algo se rompió en el código.
  // No queremos que el usuario vea "Cannot read property 'url' of null"
  const userMessage =
    statusCode === 500
      ? "Hubo un problema en el servidor. Intenta más tarde."
      : message;

  res.status(statusCode).json({
    message: userMessage,
    // Stack trace solo para ti en desarrollo
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};