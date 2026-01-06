import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string({
      required_error: "El nombre del servicio es obligatorio",
    })
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .optional(),

  price: z
    .number({
      required_error: "El precio es obligatorio",
      invalid_type_error: "El precio debe ser un número",
    })
    .min(0, "El precio no puede ser negativo"),

  companyId: z
    .string({
      required_error: "La Compañia es obligatoria",
    })
    .min(1, "ID de Compañia inválido"),

  active: z.boolean().optional(),
});
