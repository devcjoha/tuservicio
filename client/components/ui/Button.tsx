import { cn } from "@/utils/combine";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export function Button({  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  ...props }: ButtonProps) {
  
  const { theme } = useTheme();
  
  const base =
    "w-full px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary: theme === "dark" ? "bg-secondary text-neutral-50 py-2 rounded hover:bg-hover-primary transition" :"bg-primary text-neutral-50 py-2 rounded hover:bg-hover-primary transition",
    secondary: "bg-secondary text-gray-900 hover:bg-button-secondary-hover",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
 const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2 text-lg",
  };
   return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};