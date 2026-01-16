import { uploadImage } from "../utils/uploadImage.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";
import crypto from "crypto";
import Token from "../models/Token.js";
import { authMailer } from "../mailers/authMailer.js";


export const getUserProfile = async (req, res) => {
  try {
    // Si tu middleware hace: req.user = user
    const user = req.user;

    // Eliminar campos sensibles antes de enviar (opcional)
    if (user && user.password) delete user.password;
    // if (user && user.emailVerificationToken) delete user.emailVerificationToken;
    // if (user && user.emailVerificationExpires)
    //   delete user.emailVerificationExpires;
    return res.json({
      message: "Perfil obtenido",
      user,
    });
  } catch (error) {
    console.error("Error GetUserProfile:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};
export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "El correo no existe",
      });

    // 1. Limpiar tokens viejos de este tipo para este usuario
    await Token.deleteMany({ userId: user._id, type: "PASSWORD_RESET" });

    // 2. Crear un token aleatorio, expira en 10min según el model
    const resetToken = crypto.randomBytes(32).toString("hex");

    // 3. Guardar en la DB
    const tokenData = await new Token({
      userId: user._id,
      token: resetToken,
      type: "PASSWORD_RESET",
    }).save();

    // Enviar email
    const mailResponse = await authMailer.sendPasswordReset(user, tokenData);

    if (!mailResponse.success) {
      return res.status(500).json({
        success: false,
        message:
          "Error al enviar el correo de recuperación. Intenta más tarde.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Hemos enviado un enlace de 10 minutos de duración para el reestablecimiento de contraseña a tu correo. Revisa tu buzón.",
    });
  } catch (error) {
    next(error);
  }
};
export const updateUserRole = async (req, res) => {
  try {
    const { _id } = req.params;
    const { role } = req.body;

    // Validar roles permitidos
    const validRoles = ["user", "admin", "superadmin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }

    const user = await User.findByIdAndUpdate(
      _id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Rol actualizado correctamente",
      user
    });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const updateUserAvatar = async (req, res) => {
  try {
    const userId = req.user._id; // Viene de tu middleware authRequired

    // 1. Verificar si el usuario subió un archivo
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "No se ha seleccionado ninguna imagen" });
    }

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // 2. LIMPIEZA: Si el usuario ya tiene un avatar previo, borrarlo de Cloudinary
    // Solo borramos si tiene un public_id (las imágenes por defecto no suelen tenerlo)
    if (user.avatar && user.avatar.public_id) {
      try {
        await cloudinary.uploader.destroy(user.avatar.public_id);
      } catch (error) {
        console.error("Error al borrar imagen vieja de Cloudinary:", error);
        // Continuamos aunque falle el borrado para no trabar al usuario
      }
    }

    // 3. SUBIDA: Usar tu helper uploadImage (que usa streams)
    const result = await uploadImage(req.file);

    // 4. ACTUALIZACIÓN: Guardar la nueva URL y el nuevo public_id
    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await user.save();

    res.status(200).json({
      message: "Foto de perfil actualizada con éxito",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Error en updateAvatar:", error);
    res.status(500).json({ message: "Error al procesar la imagen" });
  }
};