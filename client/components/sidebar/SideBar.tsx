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
      {links.map((link, index) => (
        <li key={index} className="hover:bg-secondary-hover hover:text-primary hover:font-bold">
          <Link
          className={`
            flex items-center
            ${variant === "mobile" ? "flex-col p-2" : "gap-3 p-3 h-9 text-[.8rem] rounded-md "}
          `}
            href={link.href}
          >
            <link.icon className="w-6 h-7 text-gray-icon hover:text-primary" />
            {variant === "desktop"  && <span className=" text-gray-500">{link.label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SideBar;