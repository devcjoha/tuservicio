import { Controller, FieldError, Control, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { CustomSelect } from "./CustomSelect";

export type Option = { value: string; label: string };

export type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn; 
  control?: Control<any>; // Necesario para select-custom
  error?: FieldError;
  fieldType: "input" | "select" | "textarea" | "file" | "select-custom";
  accept?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: Option[];
};

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  register,
  control,
  error,
  fieldType = "input",
  options,
  accept,
  // onChange,
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      {/* Inputs de Texto y Archivos */}
      {(fieldType === "input" || fieldType === "file") && (
        <Input
          {...register} // Aquí ya viene el name y los handlers del padre
          type={type}
          accept={accept}
          placeholder={placeholder || label}
          error={!!error}
          errorMessage={error?.message}
        />
      )}

      {/* Select Normal (Nativo) */}
      {fieldType === "select" && (
        <Select
          {...register}
          label={label}
          error={!!error}
          errorMessage={error?.message}
        >
          <option value="">Seleccionar</option>
          {options?.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      )}

      {/* Select Personalizado (Requiere Controller) */}
      {fieldType === "select-custom" && control && (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              options={options || []}
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      )}

      {/* Textarea */}
      {fieldType === "textarea" && (
        <Textarea
          {...register}
          placeholder={placeholder || label}
          error={!!error}
          errorMessage={error?.message}
        />
      )}
    </div>
  );
};