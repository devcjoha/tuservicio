import { useTheme } from "@/context/ThemeContext";
import Image, { ImageProps } from "next/image";
import logoLight from "@/public/logo/logo-tuserv-light.webp";
import logoDark from "@/public/logo/logo-tuservicio-dark.webp";
import { cn } from "@/utils/combine";

type LogoProps = Omit<ImageProps, "src" | "alt"> & { className?: string; };

export default function Logo({ className, ...props }: LogoProps) {
  const { theme } = useTheme();
  return (
   <Image 
   {...props}
        src={theme === "light" ? logoLight : logoDark}
        alt="logo"
        width={300}
        height={300}
        loading="eager"
        className={cn("w-50 h-12 lg:w-60 lg:h-15", className)} />
  )
};