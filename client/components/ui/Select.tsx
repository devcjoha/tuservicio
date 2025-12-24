import { cn } from "@/utils/combine";
import { ChevronDown } from "lucide-react";

// Definimos el tipo para las opciones dinámicas
export type SelectOption = {
  value: string | number;
  label: string;
};

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> & {
  label?: string;
  options: SelectOption[]; // Array dinámico de opciones
  onChangeValue?: (value: string) => void; // Callback simplificado
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  placeholder?: string;
};

export function Select({
  label,
  options,
  onChangeValue,
  error,
  success,
  errorMessage,
  placeholder = "Seleccione una opción",
  className,
  value,
  ...props
}: SelectProps) {
  const base =
    "w-full appearance-none border rounded-md px-3 py-2 bg-white focus:outline-none transition-all duration-200 pr-10 cursor-pointer text-sm text-gray-700";

  const variant = error
    ? "border-red-500 focus:ring-2 focus:ring-red-500"
    : success
      ? "border-green-500 focus:ring-2 focus:ring-green-500"
      : "border-gray-border focus:ring-2 focus:ring-line-focus-ring";

  return (
    <div className="flex flex-col gap-1 w-full max-w-xs relative">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      
      <div className="relative">
        <select 
          {...props} 
          value={value}
          onChange={(e) => onChangeValue?.(e.target.value)}
          className={cn(base, variant, className)}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Icono flecha */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown size={18} />
        </div>
      </div>

      {error && errorMessage && (
        <span className="text-xs text-red-600 mt-1">{errorMessage}</span>
      )}
    </div>
  );
}