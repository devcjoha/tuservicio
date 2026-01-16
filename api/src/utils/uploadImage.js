import { v2 as cloudinary } from "cloudinary";
import { cloud_name, api_key, api_secret } from "../../config.js";

export const uploadImage = async (file) => {
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });

  return new Promise((resolve, reject) => {
    // Creamos un stream de subida
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "tuservicio" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result); // Retorna el objeto con secure_url
      }
    );
    // Enviamos los bytes del archivo directamente
    uploadStream.end(file.buffer);
  });
};