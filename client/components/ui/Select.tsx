import { cn } from "@/utils/combine";
import { ChevronDown } from "lucide-react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
};

export function Select({
  label,
  error,
  success,
  errorMessage,
  className,
  children,
  ...props
}: SelectProps) {
  const base =
    "w-full appearance-none border rounded-md px-3 py-2 bg-white focus:outline-none transition-all duration-200 pr-10 cursor-pointer";

  const variant = error
    ? "border-red-500 focus:ring-2 focus:ring-red-500"
    : success
      ? "border-green-500 focus:ring-2 focus:ring-green-500"
      : "border-gray-border focus:ring-2 focus:ring-line-focus-ring";

  return (
    <div className="flex flex-col gap-1 relative">

      <select {...props} className={cn(base, variant, className)}>
        {children}
      </select>

      {/* Icono flecha */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown />
      </div>

      {error && errorMessage && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};