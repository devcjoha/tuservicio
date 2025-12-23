//IMAGEN DE PRUEBA URL https://vvrl.cc/kdkl54
"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { institutionSchema } from "@/utils/validationSchemas";
import { InstitutionForm, useInstitutions } from "@/context/InstitutionsContext";
import { FormField } from "./FormField";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function CreateInstitutionForm() {
  const { createInstitution } = useInstitutions();
  const { user } = useAuth();
  const router = useRouter();
  const userId = user ? user.id : "";
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<InstitutionForm>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      ownerId: userId,
    }
  });

  const logoUrl = watch("logo");
  const isImageUrl = logoUrl?.match(/\.(jpeg|jpg|gif|png|webp)$/i);

  const onSubmit = async (data: InstitutionForm) => {
    try {
      await createInstitution(data)
      if (user?.role === "owner") { router.push("/dashboard"); }
      // user && user.role === "owner" ? router.push("/dashboard") : null;
    } catch (err) {
      console.error(err);
      alert("Error en el servidor");
    }
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4  mx-auto p-6 border-gray-border rounded-md shadow-lg">
      <input type="hidden" {...register("ownerId")} />
      {/* Nombre */}
      <FormField
        label="Nombre de la empresa"
        placeholder="Nombre"
        register={register("name")}
        error={errors.name}
        fieldType="input"
      />

      {/* Tipo de empresa */}
      <FormField
        label="Selecciona el tipo de empresa"
        fieldType="select"
        register={register("type")}
        error={errors.type}
        options={[
          { value: "emprendimiento", label: "Emprendimiento" },
          { value: "profesional", label: "Profesional" },
          { value: "independiente", label: "Independiente" },
        ]}
      />

      {/* Correo */}
      <FormField
        label="Correo electrónico de la empresa"
        type="email"
        placeholder="miempresa@email.com"
        register={register("email")}
        error={errors.email}
        fieldType="input"
      />

      {/* Teléfono */}
      <FormField
        label="Número de teléfono de la empresa"
        placeholder="Teléfono"
        register={register("phone")}
        error={errors.phone}
        fieldType="input"
      />

      {/* Dirección */}
      <FormField
        label="Dirección - ubicación de la empresa"
        placeholder="Dirección"
        register={register("address")}
        error={errors.address}
        fieldType="input"
      />

      {/* RIF */}
      <FormField
        label="RIF verificable de la empresa"
        placeholder="RIF"
        register={register("rif")}
        error={errors.rif}
        fieldType="input"
      />

      {/* Logo URL */}
      <FormField
        label="URL del logo de la empresa"
        placeholder="https://mi-logo.com/logo.png"
        register={register("logo")}
        error={errors.logo}
        fieldType="input"
      />

      {/* Preview del logo */}
      {isImageUrl && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Vista previa del logo:</p>
          <img
            src={logoUrl}
            alt="Logo preview"
            width={100}
            height={100}
            className="w-24 h-24 object-contain border rounded-md mt-1"
          />
        </div>
      )}

      {/* Botón */}
      <Button variant="secondary" size="lg" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando institución..." : "Crear Institución"}
      </Button>

    </form>
  );
};