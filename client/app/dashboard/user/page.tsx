"use client";
import DashUser from "@/components/dashboards/DashUser";
import { useAuth } from "@/hooks/useAuth";

export default function UserDashboardPage() {
  const { user } = useAuth();

  return (
    user?.role === "user" ? (
      <div className="bg-secondary-bg lg:w-1/2 w-full">
        <p>Page User de: {user?.name}</p>
      <DashUser />
      </div>
    ) : (null)
  );
};