import multer from "multer";
import path from "path";
import fs from "fs";

// Usamos almacenamiento en memoria en lugar de disco
const storage = multer.memoryStorage(); // Almacenamiento en RAM

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error("Formato no soportado"), false);
  },
});