"use client";

import { apiFetch } from "@/lib/api";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useModal } from "@/hooks/useModal";
import { ActionType } from "@/types/permissions";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};
export type LoginData = {
  email: string;
  password: string;
}
export type Role = "user" | "owner" | "admin" | "superadmin" | "";
export type Status = "active" | "inactive" | "paused"| "";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[],
  status: Status;
};

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  error: string | null;
  registerAuth: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  hasPermission: (actionId: ActionType) => boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // Iniciamos cargando para verificar sesión
  const [error, setError] = useState<string | null>(null);
  const { open, close } = useModal();

  // 1. Verificar si hay sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiFetch("/auth/profile"); // Endpoint protegido
        setUser(res.user);
      } catch (err) {
        setUser(null);
        console.log("Sesión no válida o usuario borrado", error);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log("AUTH CONTEXT RES", res);

      if (!res.user) {
        const apiError = res.message
        setError(apiError);
        open({
          title: "Error de autenticación",
          message: apiError,
          variant: "error",
          onClose: () => setError(null),
        });
        return null;
      }
      setUser({
        _id: res.user.id || res.user._id,
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        status: res.user.status,
        permissions: res.user.permissions || [],
      });
      open({
        title: `Bienvenido ${res.user.name}`,
        message: res.message,
        variant: "success",
      });
      return res

    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
      open({
        title: "Error de autenticación",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerAuth = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.user) {
        const apiError = res.message
        setError(apiError);
        open({
          title: "Error de autenticación",
          message: apiError,
          variant: "error",
          onClose: () => setError(null),
        });
        throw new Error(apiError);
      }
      setUser(res.user);
      open({
        title: `Bienvenido ${res.user.name}`,
        message: res.message,
        variant: "success",
      });
      close();
    } catch (err: any) {
      setError(err.message);
      open({
        title: "Error de Registro",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  function hasPermission(actionId: ActionType) {
    // Compara el ID pedido contra los permisos que llegaron en el login
    return user?.permissions.includes(actionId) ?? false;
  }

  const logout = async () => {
    setLoading(true);
    try {
      // 1. Avisamos al backend para que borre la cookie
      await apiFetch("/auth/logout/", {
        method: "POST",
        timeout: 10000,
      });
      setUser(null);

      window.location.href = "/";

    } catch (error) {
      console.error("Error al cerrar sesión", error);
      // Aunque falle la red, es mejor limpiar el estado local
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  // Esto limpia el estado local de React antes de que la pestaña desaparezca, bo
  useEffect(() => {
    const handleTabClose = () => {
      setUser(null);
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, setUser, loading, error, registerAuth, login, logout, clearError, hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};