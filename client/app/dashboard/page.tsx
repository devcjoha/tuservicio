"use client";
import DashboardRouter from "@/components/dashboards/DashBoardRouter";

export default function DashboardPage({ children }: { children: React.ReactNode }) {

  return <DashboardRouter>{children}</DashboardRouter>;
}