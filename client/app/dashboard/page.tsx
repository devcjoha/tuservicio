"use client";
import DashboardRouter from "@/components/dashboards/DashBoardRouter";


export default function DashboardPage({ children }: { children: React.ReactNode }) {
"use client";

  return <DashboardRouter>{children}</DashboardRouter>;
}