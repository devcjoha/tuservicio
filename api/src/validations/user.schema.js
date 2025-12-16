import { z } from "zod";

export const updateRoleSchema = z.object({
  role: z.enum(["user", "admin", "superadmin"], {
    required_error: "El rol es obligatorio",
    invalid_type_error: "Rol inválido",
  }),
});