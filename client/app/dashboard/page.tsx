"use client";
import DashboardRouter from "@/context/DashBoardRouter";

export default function DashboardPage({ children }: { children: React.ReactNode }) {

  return <DashboardRouter>{children}</DashboardRouter>;
}