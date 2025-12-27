"use client";
import { FormField } from "@/components/ui/FormFields";
import { useAuth } from "@/hooks/useAuth";
import { getLinksByPermissions } from "@/utils/getLinksByPermissions";
import { useState } from "react";
import { FieldError } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";

export default function UserDashboard() {
  const { user } = useAuth();
  const searchLinks = getLinksByPermissions(user, "search");
  const [errorsFilter, setErrorsFilter] = useState()
  const { control, register, handleSubmit, formState: { errors } } = useForm();

  // Transformamos los links al formato que espera el Select
  const options = searchLinks.map((link) => ({
    label: link.label,
    value: link.href
  }));

  const handleFilterChange = (path: string) => {
    console.log("Navegando a o filtrando por:", path);
    // manejo de router a modal o page y filtros
  };


  return (
    <div className="p-4 bg-secondary-bg lg:w-1/2 w-full">
      <FormField
        name="filter" // 👈 nombre del campo en RHF
        label="Filtrar por tipo de búsqueda"
        options={options}
        fieldType="select-custom" // 👈 usa el custom 
        control={control} // 👈 viene de useForm() 
        error={errorsFilter} // 👈 error específico del campo 
      />
    </div>
  );
};