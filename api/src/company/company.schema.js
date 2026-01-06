import { z } from "zod";

export const companySchema = z.object({
  name: z
    .string({
      required_error: "El nombre de la Compañia es obligatorio",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  type: z
    .string({
      required_error: "El tipo de Compañia es obligatorio",
    })
    .min(3, "El tipo debe tener al menos 3 caracteres"),

  email: z.string().email({ message: "Email institucional inválido" }),

  phone: z.string().min(7, "El teléfono debe tener al menos 7 dígitos"),

  address: z.string().min(5, "La dirección es demasiado corta"),

  rif: z.string().regex(/^[JGVEP]-\d{8}-\d$/, "Formato de RIF inválido"),

  logo: z.string().optional(),

  active: z.boolean().optional(),
});
