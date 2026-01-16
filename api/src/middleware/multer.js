import multer from "multer";

// 1. Configuramos el almacenamiento en memoria
const storage = multer.memoryStorage();

// 2. Filtro de seguridad para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo no es una imagen válida"), false);
  }
};
// 3. Middleware configurado (límite de 5MB por seguridad)
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});