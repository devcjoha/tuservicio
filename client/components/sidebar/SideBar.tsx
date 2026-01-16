"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { EllipsisVertical, Icon, LogOut } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../header/ThemeToggle";
import { useNavegation } from "@/hooks/useNavigation";
import IconLucide from "../ui/IconLucide";

export type SidebarProps = {
  variant: "mobile" | "desktop";
};

function SideBar({ variant }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false); 
  const { links, hasPermission } = useNavegation(user);


  
  // Si es mobile, solo mostramos los primeros 4. El resto van al "Más".
  const mainLinks = variant === "mobile" ? links.slice(0, 4) : links;
  const secondaryLinks = variant === "mobile" ? links.slice(4) : [];

  return (
    <nav className={variant === "mobile" ? "fixed bottom-0 w-full bg-background border-t border-t-gray-200 text-icon" : "min-h-screen text-icon"}>
      <ul className={`flex ${variant === "mobile" ? "justify-around items-center h-14" : "flex-col gap-2 p-4 min-h-screen shadow-lg"}`}>

        <Link href={"/dashboard"} className={variant === "mobile" ? "flex flex-col items-center p-2 text-[10px]" : "flex gap-3 p-3 rounded-md"}>
          <IconLucide name={"LayoutDashboard"} className="w-6 h-6" /><li>Dashboard</li></Link>
       
        {/* Links Principales */}
        {mainLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className={variant === "mobile" ? "flex flex-col items-center p-2 " : "flex gap-3 p-3 rounded-md"}>
              <IconLucide name={link.icon} className="w-6 h-6" />
              {variant === "desktop" && <span>{link.label}</span>}
            </Link>
          </li>
        ))}

        <ThemeToggle />
        {/* Botón "Más" (Solo Mobile) */}
        {variant === "mobile" && secondaryLinks.length > 0 && (
          <li>
            <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="flex flex-col items-center p-2">
              <EllipsisVertical className="w-6 h-6 text-icon hover:bg-gray-500/30 hover:rounded-full" />
              <span className="text-[10px]">Más</span>
            </button>
          </li>
        )}

        {/* Cerrar Sesión (Desktop siempre visible, Mobile dentro de 'Más') */}
        {variant === "desktop" && (
          <button onClick={logout} className="mt-auto flex gap-3 p-3 text-accent">
            <LogOut /> <span>Cerrar sesión</span>
          </button>
        )}
      </ul>

      {/* Menú Desplegable "Más" para Mobile */}
      {isMoreOpen && variant === "mobile" && (
        <div className="absolute bottom-14 right-0 w-48 bg-background shadow-lg border border-transparent rounded-t-lg p-2 flex flex-col gap-1">
          {secondaryLinks.map((link, index) => (
            <Link key={index} href={link.href} className="flex items-center gap-2 p-3  hover:bg-gray-100" onClick={() => setIsMoreOpen(false)}>
              <IconLucide name={link.icon} className="w-4 h-4"  />
              <span className="text-[.7rem]">{link.label}</span>
            </Link>
          ))}
          <button onClick={logout} className="flex items-center gap-3 p-3 text-accent border-t cursor-pointer">
            <LogOut className="w-5 h-5" />
            <span className="text-[.7rem]">Cerrar sesión</span>
          </button>
        </div>
      )}
    </nav>
  );
}
export default SideBar;