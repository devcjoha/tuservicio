"use client";
import { useState } from "react";
// import Link from "next/link";
// import ThemeToggle from "@/components/header/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { UserLock } from "lucide-react";
import { useInstitutions } from "@/context/InstitutionsContext";

function HeaderDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { institutions} = useInstitutions();
console.log("HEADER DASHBOARD", institutions);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  }
  return (

    <nav className="header-dashboard flex flex-row items-center gap-5">
      <div className="dashboard-avatar-container flex items-center justify-center w-10 h-10 border rounded-full border-gray-icon">
      <UserLock className="text-gray-icon" />
      </div>
      {!institutions ? <p>Hola {user?.name}</p> : "insttution"}
      
    </nav>
  );
}
export default HeaderDashboard;