import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import logoLight from "@/public/logo/tuserv-light.webp";
import logoDark from "@/public/logo/tuservicio-dark.svg";

export default function Logo({...props}) {
  const { theme } = useTheme();
  return (
   <Image {...props}
        src={theme === "light" ? logoLight : logoDark}
        alt="logo"
        width={300}
        height={300}
        loading="eager"
        className="w-50 h-12 lg:w-60 lg:h-14" />
  )
};