import { Input } from "@/components/ui/Input";
import { useState, useEffect } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const ImageUploadField = ({ label, register, error }: Props) => {
  
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="file"
        accept="image/*"
        {...register}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};
