"use client";
import { useAuth } from "@/hooks/useAuth";
import SideBar from "@/components/sidebar/SideBar";
import DashboardRouter from "@/components/dashboards/DashBoardRouter";


function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Cargando sistema...</div>;
  if (!user) return <div>Redirigiendo...</div>;

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