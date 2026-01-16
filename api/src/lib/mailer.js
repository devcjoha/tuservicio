import nodemailer from "nodemailer";
import { email_user, email_pass } from "../../config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: email_user, pass: email_pass },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const dataEmail = await transporter.sendMail({
      from: `"TuServicio.com" <${email_user}>`,
      to,
      subject,
      html,
    });
    return { success: true, dataEmail };
  } catch (error) {
    // Aquí logueamos para nosotros, pero NO usamos 'res'
    console.error("❌ Error crítico en Mailer Service:", error.message);
    return { success: false, error: error.message }; 
  }
};
// const transporter = nodemailer.createTransport({
//   service: "gmail", // Puedes usar 'gmail' o configurar host/port de otro servicio
//   auth: {
//     user: email_user,
//     pass: email_pass,
//   },
// });
// export const sendEmail = async ({ to, subject, html }) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"TuServicio.com" <${email_user}>`,
//       to,
//       subject,
//       html,
//     });
//     return info;
//   } catch (error) {
//     console.error("Error enviando email:", error);
//     res.status(500).json({ error: true, message: error.message });
//     throw new Error("No se pudo enviar el correo de verificación");
//   }
// };