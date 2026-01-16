import User from "../../models/User.js";
import { frontend_url } from "../../../config.js";
import { generateToken } from "../../auth/authController.js";
import { isProduction } from "../../../config.js";
import Token from "../../models/Token.js";
import { authMailer } from "../../mailers/authMailer.js";

export const emailVerificationToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    // 1. Buscamos el token en la colección dedicada (donde lo guardaste en el register)
    const tokenData = await Token.findOne({
      token,
      type: "VERIFY_EMAIL",
    });

    if (!tokenData) {
      // Si no hay token, el link es viejo o inventado
      return res.redirect(`${frontend_url}/verify-email?error=no_token`);
    } else {
      // 2. Actualizamos al usuario. Usamos el userId que el token tiene guardado.
      const user = await User.findByIdAndUpdate(
        tokenData.userId,
        {
          $set: { isEmailVerified: true },
          $unset: {
            emailVerificationToken: "",
            emailVerificationExpires: "",
          },
        },

        { new: true }
      );

      if (!user) {
        return res.redirect(`${frontend_url}/verify-email?error=no_user`);
      }

      // 3. Borramos el token de la colección Token (ya no hace falta)
      await Token.deleteOne({ _id: tokenData._id });

      // ENVIAR CORREO DE CONFIRMACIÓN

      const mailResponse = await authMailer.sendVerificationEmailSuccess(user);
      if (!mailResponse.success) {
        console.error(
          "Aviso: El correo de éxito no se envió:",
          mailResponse.error
        );
      }

      const jwtToken = generateToken(user._id, user.role);
      res.cookie("token", jwtToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
        path: "/",
      });

      return res.redirect(`${frontend_url}/verify-email?success=true`);
    }
  } catch (error) {
    console.error("Error emailVerificationToken:", error);
    res.status(500).json({
      error: true,
      message: "Error al verificar el email",
      error: error.message,
    });
  }
  return res.redirect(`${frontend_url}/login?error=server_error`);
};
