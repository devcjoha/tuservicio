"use client";

import { apiFetch } from "@/lib/api";
import { createContext, useState, useEffect, ReactNode } from "react";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};
export type LoginData = {
    email: string;
  password: string;
}
export type Role = "user" | "owner" | "admin" | "superadmin";

export type UserType = {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: string[]
};

export type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isLoading: boolean;
  error: string | null;
  registerAuth: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
   hasPermission: (actionId: string) => boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Iniciamos cargando para verificar sesión
  const [error, setError] = useState<string | null>(null);
      console.log("AUTH CONTEXT", user);
  // 1. Verificar si hay sesión al cargar la app
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiFetch("/auth/profile"); // Endpoint protegido
        setUser(res.user);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

const login = async (data: LoginData) => {
  setIsLoading(true);
  setError(null);
  try {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.user) {
      setUser({
        id: res.user.id || res.user._id, 
        name: res.user.name,
        email: res.user.email,
        role: res.user.role,
        permissions: res.user.permissions || []
      });
    }
  } catch (err: any) {
    setError(err.message || "Error al iniciar sesión");
    throw err;
  } finally {
    setIsLoading(false);
  }
};

  const registerAuth = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setUser(res.user);
    } catch (err: any) {
      setError(err.message || "Error al registrarse");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

   function hasPermission(actionId: string) {
    return user?.permissions.includes(actionId) ?? false;
  }

  const logout = async () => {
    try {
      await apiFetch("/auth/logout"); // Avisamos al backend para borrar la cookie
    } finally {
      setUser(null);
      // Opcional: window.location.href = "/login";
    }
  };
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ 
      user, setUser, isLoading, error, registerAuth, login, logout, clearError, hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};