
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Intentamos validar los datos que llegan en el cuerpo de la petición
    schema.parse(req.body);
    next();
  } catch (error) {
    // Si hay errores de Zod, los formateamos con cuidado
    if (error.issues) {
      const errorMessages = error.issues.map((issue) => ({
        path: issue.path[0],
        message: issue.message,
      }));
      return res.status(400).json({ errors: errorMessages });
    }

    // Si es otro tipo de error
    return res.status(500).json({ message: "Error interno en la validación" });
  }
};