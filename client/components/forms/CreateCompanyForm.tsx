//IMAGEN DE PRUEBA URL https://vvrl.cc/kdkl54
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { companySchema } from "@/utils/validationSchemas";
import { Company, useCompanies } from "@/context/CompanyContext";
import { FormField } from "../ui/FormFields";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { useModal } from "@/hooks/useModal";

type CreateCompanyInput = Omit<Company, "id" | "status">;

export default function CreateCompanyForm() {
  const { createCompany } = useCompanies();
  const { user } = useAuth();
  const router = useRouter();
  const userId = user ? user._id : "";
  const { close } = useModal();

  const { register, control, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<CreateCompanyInput>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      ownerId: userId,
    }
  });


  const onSubmit = async (data: CreateCompanyInput) => {
    try {
      // 1. Crear el contenedor FormData
      const formData = new FormData();

      // 2. Agregar campos de texto
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("rif", data.rif);
      formData.append("ownerId", data.ownerId);
      // 3. Sacamos el ARCHIVO real del FileList
      const file = data.logo?.item(0) ?? data.logo?.[0];
      if (file) formData.append("logo", file);

      // 4. Enviar al contexto
    await createCompany(formData);

      if (user?.role === "owner") {
        router.push("/dashboard");
      }
       setTimeout(() => { close(); }, 1000);
    } catch (err) {
      console.error("Create Company form", err);
      setTimeout(() => { close(); }, 5000);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4  mx-auto p-6 border-gray-border rounded-md shadow-lg">
         <input
        type="hidden"
        {...register("ownerId")}
      />
      {/* Nombre */}
      <FormField
        name="name"
        label="Nombre de la empresa"
        placeholder="Nombre"
        register={register("name")}
        error={errors.name}
        fieldType="input"
      />

      {/* Tipo de empresa */}
      <FormField
        register={register("type")}
        name="type"
        label="Selecciona el tipo de empresa"
        fieldType="select-custom"
        control={control} // <-- aquí debe ir control 
        error={errors.type}
        options={[
          { value: "emprendimiento", label: "Emprendimiento" },
          { value: "profesional", label: "Profesional" },
          { value: "independiente", label: "Independiente" },
        ]}
      />

      {/* Correo */}
      <FormField
        name="email"
        label="Correo electrónico de la empresa"
        type="email"
        placeholder="miempresa@email.com"
        register={register("email")}
        error={errors.email}
        fieldType="input"
      />

      {/* Teléfono */}
      <FormField
        name="phone"
        label="Número de teléfono de la empresa"
        placeholder="Teléfono"
        register={register("phone")}
        error={errors.phone}
        fieldType="input"
      />

      {/* Dirección */}
      <FormField
        name="address"
        label="Dirección - ubicación de la empresa"
        placeholder="Dirección"
        register={register("address")}
        error={errors.address}
        fieldType="input"
      />

      {/* RIF */}
      <FormField
        name="rif"
        label="RIF verificable de la empresa"
        placeholder="RIF"
        register={register("rif")}
        error={errors.rif}
        fieldType="input"
      />
      {/*Logo */}
      <ImageUploadField
        label="Logo de la empresa"
        register={register("logo")}
        error={errors.logo}
      />

      {/* Botón */}
      <Button variant="secondary" size="lg" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creando Compañia..." : "Crear Institución"}
      </Button>

    </form>
  );
};