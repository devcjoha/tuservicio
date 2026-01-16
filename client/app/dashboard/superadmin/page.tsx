"use client";
import DashSuperAdmin from "@/components/dashboards/DashSuperadmin";
import { useAuth } from "@/hooks/useAuth";

export default function SuperadminDashboard() {
  const { user } = useAuth();

  
  return (
    user?.role === "superadmin" ? (
      <div>
      <h1>Container del Superadmin</h1>
        <DashSuperAdmin />
      </div>
    ) : (null))
};