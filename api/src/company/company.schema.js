import { z } from "zod";
const phoneRegex = /^(0414|0424|0412|0416|0426|0212)\d{7}$/;

export const companySchema = z.object({
  name: z
    .string({
      required_error: "El nombre de la Compañia es obligatorio",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  categories: z.array(z.string()).min(1, "Selecciona al menos una categoría"),

  email: z.string().email({ message: "Email institucional inválido" }),

  phone: z
    .string()
    .min(1, "El teléfono es obligatorio")
    .regex(phoneRegex, "Número inválido. Usa el formato 04121234567 (11 dígitos)"),

  address: z.string().min(5, "La dirección es demasiado corta"),

  rif: z.string().regex(/^[JGVEP]-\d{8}-\d$/, "Formato de RIF inválido"),

  logo: z.string().optional(),

  active: z.boolean().optional(),
   businessModel: z.enum([
      "Oficio-Independiente",
      "Empresa",
      "Cooperativa",
      "Profesional-independiente"
    ])
});
