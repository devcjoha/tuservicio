import { Controller, FieldError, Control, useForm } from "react-hook-form";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { CustomSelect, CustomSelectProps } from "./CustomSelect";
import { Key } from "react";


export type Option = { value: string; label: string };

export type BaseFormFieldProps = {
  name: string;
  label: string;
  type?: string; // para input
  placeholder?: string;
  register?: any; // handle de RHF
  error?: FieldError;
  fieldType: "input" | "select" | "textarea" | "file";
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options?: Option[]; // 👈 ahora también para select normal
};

type SelectCustomProps = {
  name: string;
  label: string;
  fieldType: "select-custom";
  control: Control;
  error?: { message?: string };
  options: CustomSelectProps["options"];
};

type FormFieldProps = BaseFormFieldProps | SelectCustomProps;

export function FormField(props: FormFieldProps) {
  const {
    name,
    label,
    fieldType,
    error,

    type,
    placeholder,
    accept,
    onChange,
    options,

  } = props as any; // 👈 destructuramos todo

  const { register, control, handleSubmit, formState: { errors } } = useForm();

  const errorId = `${label.toLowerCase()}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      {fieldType === "input" && (
        <Input
          {...register(name)}
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
          {...register(name)}
          label={label}
          placeholder={placeholder || label}
          error={!!error}
          errorMessage={error?.message}
        />
      )}

      {fieldType === "select" && (
        <Select
          {...register(name)}
          label={label}
          error={!!error}
          errorMessage={error?.message}
        >
          <option value="">Seleccionar</option>
          {options?.map((opt: { value: string | undefined; label: string | undefined; }, index: Key | null | undefined) => (
            <option
              key={index}
              value={opt.value}
              className="bg-red-300 border-none"
            >
              {opt.label}
            </option>
          ))}
        </Select>
      )}

      {fieldType === "select-custom" && (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <CustomSelect
              // label={label}
              options={options}
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      )}

      {fieldType === "file" && (
        <Input
          {...register(name)}
          type="file"
          accept={accept}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="w-full border rounded-md px-3 py-2"
        />
      )}
    </div>
  );
}