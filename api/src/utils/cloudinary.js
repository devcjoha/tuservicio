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
// import cloudinary from "cloudinary";
// import { cloud_name, api_key, api_secret } from "../../config.js";

// export const uploadImage = async (image) => {
//   cloudinary.config({
//     cloud_name,
//     api_key,
//     api_secret,
//     secure: true,
//   });

//   // Upload
//   const result = cloudinary.uploader.upload(image.path, {
//     //no sé si colocar el V2.
//     folder: "tuservicio",
//     width: 1200,
//     crop: "scale",
//     sign_url: true, 
//     type: "authenticated"
//   });
//   result
//     .then((data) => {
//       "success", JSON.stringify(data.secure_url, data.public_id, 2);
//       // console.log("data cloudinary", data.public_id);
//       return data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   const infoImage = await result;

//   return infoImage;
// };

// export const deleteImageCloudinary = async (dataImage) => {
//   cloudinary.config({
//     cloud_name: cloud_name,
//     api_key: api_key,
//     api_secret: api_secret,
//     secure: true,
//   });
//   try {
//     await cloudinary.v2.uploader.destroy(dataImage);
//   } catch (error) {
//     console.log(error);
//   }
// };