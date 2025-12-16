"use client";

import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function DashboardRouter() {
  const { user } = useAuth();

  if (!user) return null; // o loading

  if (user.role === "user") redirect("/dashboard/user");
  if (user.role === "owner") redirect("/dashboard/owner");
  if (user.role === "admin") redirect("/dashboard/admin");
  if (user.role === "superadmin") redirect("/dashboard/superadmin");

  return null;
}