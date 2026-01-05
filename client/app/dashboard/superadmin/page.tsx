"use client";
import { useAuth } from "@/hooks/useAuth";

export default function SuperadminDashboard() {
  const { user, loading: userLoading, clearError } = useAuth();
  
  return (
    user?.role === "superadmin" ? (
      <h1>Panel del Superadmin</h1>
    ) : (null))
};