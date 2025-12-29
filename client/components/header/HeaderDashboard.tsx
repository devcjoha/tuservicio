"use client";
import { useAuth } from "@/hooks/useAuth";
import { UserLock } from "lucide-react";
import { useCompanies } from "@/context/CompanyContext";
import Logo from "../icons/Logo";


function HeaderDashboard() {
  const { user } = useAuth();
  const { companies, loading } = useCompanies();

  const hello = companies.length === 0 ? <p>Hola <span className="font-bold">{user?.name}!</span> </p> : <p>Hola {companies[0].name} </p>

  return (

    <nav className="header-dashboard flex flex-row flex-wrap items-center gap-2 justify-between">
      <Logo />
      <div className="flex  items-center">

        {hello}
        <div className="header-dashboard-avatar flex items-center justify-center w-10 h-10 border rounded-full border-soft">
          <UserLock className="text-soft" />
        </div>
      </div>
    </nav>
  );
}
export default HeaderDashboard;