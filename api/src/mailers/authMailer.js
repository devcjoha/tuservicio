import { backend_url, frontend_url } from "../../config.js";
import { sendEmail } from "../lib/mailer.js";
import {
  verificationTemplate,
  verificationSuccessTemplate,
  passwordResetTemplate,
  passwordResetTemplateSuccess,
} from "./templates/authTemplates.js";
import { baseLayout } from "./templates/baseLayout.js";

export const authMailer = {
  sendVerificationEmail: async (user, tokenData) => {
    const verificationUrl = `${backend_url}/api/auth/verify-email/${tokenData.token}`;
    const content = verificationTemplate(user.name, verificationUrl);

    return await sendEmail({
      to: user.email,
      subject: "Verifica tu cuenta en TuServicio.com ✅",
      html: baseLayout(content),
    });
  },
  sendVerificationEmailSuccess: async (user) => {
    const redirectUrl = `${frontend_url}/login`;

    const content = verificationSuccessTemplate(user.name, redirectUrl);

    return await sendEmail({
      to: user.email,
      subject: `¡Cuenta verificada con éxito! ✅`,
      html: baseLayout(content),
    });
  },
  sendPasswordReset: async (user, tokenData) => {
    const resetUrl = `${frontend_url}/reset-password?token=${tokenData.token}&id=${user._id}`;
    const content = passwordResetTemplate(user.name, resetUrl);

    return await sendEmail({
      to: user.email,
      subject: "Recuperar contraseña - TuServicio 🔑",
      html: baseLayout(content),
    });
  },
  sendPasswordResetSuccess: async (user) => {
    const resetPasswordUrl = `${frontend_url}/login`;
    const content = passwordResetTemplateSuccess(user.name, resetPasswordUrl);

    return await sendEmail({
      to: user.email,
      subject: "Recuperar contraseña con éxito! - TuServicio 🔑",
      html: baseLayout(content),
    });
  },
};
