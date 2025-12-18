"use client";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};
type LoginData = {
    email: string;
  password: string;
}

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[]
} | null;

type AuthContextType = {
user: UserType;
  isLoading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true); // Iniciamos cargando para verificar sesión
  const [error, setError] = useState<string | null>(null);

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

  const register = async (data: RegisterData) => {
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
      user, isLoading, error, register, login, logout, clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};