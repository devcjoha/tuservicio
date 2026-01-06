"use client";
import { useAuth } from "@/hooks/useAuth";
import SideBar from "@/components/sidebar/SideBar";
import DashboardRouter from "@/context/DashBoardRouter";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import { LoadingCard } from "@/components/feedbacks/LoadingCard";
import { LoadingDots } from "@/components/feedbacks/LoadingDots";


function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingDots/>;
  if (!user) return <LoadingCard message="Redirigiendo... obteniendo información de sesión" />;

  //Dashboard Layout TODOS
  return (

    <DashboardRouter >
      <div className="flex flex-1">
        {/* Sidebar vertical en desktop */}
        <aside className="hidden lg:block w-64 border-r border-gray-border bg-background ">
          <SideBar variant="desktop" />
        </aside>

        {/* Contenido */}
        <main className="flex-1 p-5">
          <HeaderDashboard />
          {children}
        </main>
      </div>

      {/* Bottom bar en mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-border shadow-md">
        <SideBar variant="mobile" />
      </nav>
    </DashboardRouter>

  );
}
export default DashboardLayout;