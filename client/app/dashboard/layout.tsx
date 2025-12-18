"use client";
import Header from "@/components/header/Header";
import { useAuth } from "@/hooks/useAuth";
import SideBar from "@/components/sidebar/SideBar";


function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  console.log("DASHBOARD LAYOUT", user);

  if (isLoading) return <div>Cargando sistema...</div>;
  if (!user) return <div>Redirigiendo...</div>;

  return (
    <div className="dashboard-layout">
      <Header />
      <SideBar role={user.role} />
      <main>{children}</main>
    </div>
  );
}
export default DashboardLayout;