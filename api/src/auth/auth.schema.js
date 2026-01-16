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
  .regex(phoneRegex, "Número inválido. Ejemplo: 04141234567 (11 dígitos)"),
  documentType: z.enum(["DNI", "Cédula", "Pasaporte", "RIF"]),
  documentNumber: z.string().min(7, "Número de documento obligatorio"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Debe incluir mayúscula, número y símbolo"),
});


export const resetPasswordSchema = z.object({
  token: z.string().optional(),
  userId: z.string().optional(),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Debe incluir mayúscula, número y símbolo"),
});