import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 
      "Debe incluir mayúscula, número y símbolo"),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nombre demasiado corto"),
});