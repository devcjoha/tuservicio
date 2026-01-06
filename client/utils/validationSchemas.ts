import { z } from "zod";

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
  type: z.string().min(3, "Tipo requerido"),
  phone: z.string().min(7, "Teléfono requerido"),
  email: z.string().email("Correo inválido"),
  rif: z.string().regex(/^[JGVEP]-\d{8}-\d$/, "Formato de RIF inválido"),
  address: z.string().min(5, "Dirección requerida"),

  logo: z.custom<FileList>((val) => val instanceof FileList, { message: "Logo debe ser un archivo", })
    .optional()
    .refine((fl) => !fl || fl.length <= 1, "Solo se permite un archivo de logo"),
  ownerId: z.string(),
  id: z.string().optional(),
  status: z.enum(["active", "inactive", "paused", ""]).optional(),
});
