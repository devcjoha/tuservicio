"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getLinksByPermissions } from "@/utils/getLinksByPermissions";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

export type SidebarProps = {
  variant: "mobile" | "desktop";
};
function SideBar({ variant }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isMoreOpen, setIsMoreOpen] = useState(false); // Estado para el menú hamburguesa

  const allLinks = getLinksByPermissions(user);
  
  // Si es mobile, solo mostramos los primeros 4. El resto van al "Más".
  const mainLinks = variant === "mobile" ? allLinks.slice(0, 4) : allLinks;
  const secondaryLinks = variant === "mobile" ? allLinks.slice(4) : [];

  return (
    <nav className={variant === "mobile" ? "fixed bottom-0 w-full bg-white border-t" : "h-full"}>
      <ul className={`flex ${variant === "mobile" ? "justify-around items-center h-16" : "flex-col gap-2 p-4 h-full"}`}>
        
        {/* Links Principales */}
        {mainLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className={variant === "mobile" ? "flex flex-col items-center p-2" : "flex gap-3 p-3 rounded-md"}>
              <link.icon className="w-6 h-6" />
              {variant === "desktop" && <span>{link.label}</span>}
            </Link>
          </li>
        ))}

        {/* Botón "Más" (Solo Mobile) */}
        {variant === "mobile" && secondaryLinks.length > 0 && (
          <li>
            <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="flex flex-col items-center p-2">
              <Menu className="w-6 h-6 text-primary" />
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
        <div className="absolute bottom-16 right-0 w-48 bg-white shadow-lg border rounded-t-lg p-2 flex flex-col gap-2">
          {secondaryLinks.map((link, index) => (
            <Link key={index} href={link.href} className="flex items-center gap-3 p-3 hover:bg-gray-100" onClick={() => setIsMoreOpen(false)}>
              <link.icon className="w-5 h-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          ))}
          <button onClick={logout} className="flex items-center gap-3 p-3 text-accent border-t">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      )}
    </nav>
  );
}
export default SideBar;