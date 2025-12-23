import { cn } from "@/utils/combine";

type InputSize = "sm" | "md" | "lg";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "color"
> & {
  label?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  sizeInput?: InputSize;
};

export function Input({
  label,
  error,
  success,
  errorMessage,
  sizeInput = "md",
  className,
  ...props }: InputProps) {
  const base =
    "input w-full border rounded-md px-3 py-2 focus:outline-none transition-all duration-200";

  const sizes = {
    sm: "text-sm py-1",
    md: "text-base py-2",
    lg: "text-lg py-3",
  };

  const variants = {
    default: "border-gray-border focus:ring-2 focus:ring-line-focus-ring",
    error: "border-red-500 focus:ring-2 focus:ring-red-500",
    success: "border-green-500 focus:ring-2 focus:ring-green-500",
  };

  const variant = error ? variants.error : success ? variants.success : variants.default;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        {...props}
        className={cn(base, sizes[sizeInput], variant, className)}
        autoComplete={`current-${label}`}
      />

      {error && errorMessage && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
}