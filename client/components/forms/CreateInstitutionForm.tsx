//IMAGEN DE PRUEBA URL https://vvrl.cc/kdkl54

"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

import { Institution, useInstitutions } from "@/context/InstitutionsContext";

const institutionSchema = z.object({
  name: z.string().min(3, "Nombre requerido"),
  type: z.string().min(3, "Tipo requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(7, "Teléfono requerido"),
  address: z.string().min(5, "Dirección requerida"),
  rif: z.string().min(5, "RIF requerido"),
  logo: z.string().url("Debe ser una URL válida").optional(),
});

type InstitutionForm = z.infer<typeof institutionSchema>;


export default function CreateInstitutionForm() {
  const {createInstitution} = useInstitutions();

  const { register, handleSubmit, formState: { errors }, reset} = useForm<InstitutionForm>({
    resolver: zodResolver(institutionSchema),
  });

  const onSubmit = async (data: Omit<Institution, "id">) => {
    try {
      await createInstitution(data)
    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Nombre de la empresa" {...register("name")} placeholder="Nombre" />
      {errors.name && <p>{errors.name.message}</p>}

      <Input label="Selecciona el tipo de empresa"{...register("type")} placeholder="Tipo" />
      {errors.type && <p>{errors.type.message}</p>}

      <Input label="Correo electrónico de la empresa" {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <Input label="Número de teléfono de la empresa" {...register("phone")} placeholder="Teléfono" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <Input label="Dirección - ubicación de la empresa" {...register("address")} placeholder="Dirección" />
      {errors.address && <p>{errors.address.message}</p>}

      <Input label="Rif verificable de la empresa"{...register("rif")} placeholder="RIF" />
      {errors.rif && <p>{errors.rif.message}</p>}

      <Input label="Url del logo de la empresa (convierta su imágen en un tipo url)ENLACE"{...register("logo")} placeholder="Logo URL" />
      {errors.logo && <p>{errors.logo.message}</p>}

      <Button  variant="secondary" size="lg" type="submit">Crear Institución</Button>

    </form>
  );
};