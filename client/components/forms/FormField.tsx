import { FieldError } from "react-hook-form";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";

type FieldType = "input" | "select" | "textarea";
type FormFieldProps = {
  label: string;
  type?: string; // para input
  placeholder?: string;
  register: any; // viene de useForm().register
  error?: FieldError;
  fieldType?: FieldType;
  options?: { value: string; label: string }[]; // para select
};

export function FormField({
  label,
  type = "text",
  placeholder,
  register,
  error,
  fieldType = "input",
  options,
}: FormFieldProps) {
  const errorId = `${label.toLowerCase()}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      {fieldType === "input" && (
        <Input
          {...register}
          type={type}
          placeholder={placeholder || label}
          error={!!error}
          errorMessage={error?.message}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />
      )}

      {fieldType === "textarea" && (
        <Textarea
          {...register}
          label={label}
          placeholder={placeholder || label}
          error={!!error}
          errorMessage={error?.message}
        />
      )}

      {fieldType === "select" && (
        <Select
          {...register}
          label={label}
          error={!!error}
          errorMessage={error?.message}
        >
          <option value="">Seleccione</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
};