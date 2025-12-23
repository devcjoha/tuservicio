import { cn } from "@/utils/combine";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
};

export function Textarea({
  label,
  error,
  success,
  errorMessage,
  className,
  ...props
}: TextareaProps) {
  const base =
    "w-full border rounded-md px-3 py-2 focus:outline-none transition-all duration-200";

  const variant = error
    ? "border-red-500 focus:ring-2 focus:ring-red-500"
    : success
    ? "border-green-500 focus:ring-2 focus:ring-green-500"
    : "border-gray-border focus:ring-2 focus:ring-line-focus-ring";

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <textarea {...props} className={cn(base, variant, className)} />

      {error && errorMessage && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};