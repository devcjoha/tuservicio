"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getLinksByPermissions } from "@/utils/getLinksByPermissions";


export type SidebarProps = {
  variant: "mobile" | "desktop";
};

function SideBar({ variant }: SidebarProps) {
  const { user } = useAuth();

  const links = getLinksByPermissions(user);

  return (
    <ul className={`flex ${variant === "mobile" ? "justify-around" : "flex-col gap-2 p-4 h-full justify-center"}`}>
      {links.map(link => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={`
              flex items-center
              ${variant === "mobile" ? "flex-col p-2" : "gap-3 p-3 rounded-md hover:bg-gray-200"}
            `}
          >
            <link.icon className="w-6 h-7 text-gray-icon" />
            {variant === "desktop" && <span>{link.label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SideBar;