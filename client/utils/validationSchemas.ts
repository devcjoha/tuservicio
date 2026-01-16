import { z } from "zod";
const phoneRegex = /^(0414|0424|0412|0416|0426|0212)\d{7}$/;

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Debe incluir mayúscula, número y símbolo"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nombre demasiado corto"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z
  .string()
  .min(1, "El teléfono es obligatorio")
  .regex(phoneRegex, "Número inválido. Ejemplo: 04121234567 (11 dígitos)"),
  documentType: z.enum(["DNI", "Cédula", "Pasaporte", "RIF"]),
  documentNumber: z.string().min(7, "Número de documento obligatorio"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Debe incluir mayúscula, número y símbolo"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // 👈 el error se asigna a este campo
});

export const companySchema = z.object({
  name: z.string().min(3, "Nombre requerido"),
  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(phoneRegex, "Número inválido. Usa el formato 04121234567 (11 dígitos)"),
  email: z.string().email("Correo inválido"),
  rif: z.string().regex(/^[JGVEP]-\d{8}-\d$/, "Formato de RIF inválido"),
  address: z.string().min(5, "Dirección requerida"),
  logo: z.any().optional(),
  ownerId: z.string(),
  id: z.string().optional(),
  status: z.enum(["active", "inactive", "paused", ""]).optional(),
  categories: z.array(z.string()).min(1, "Selecciona al menos una categoría"),
  businessModel: z.enum([
    "Oficio-Independiente",
    "Empresa",
    "Cooperativa",
    "Profesional-independiente"
  ])
});
export const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Debe incluir mayúscula, número y símbolo"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // 👈 Esto pone el error específicamente bajo el segundo input
});
