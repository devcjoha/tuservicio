"use client";
import { apiFetch } from "@/lib/api";
import { createContext, useState, useEffect } from "react";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[]
} | null;

type AuthContextType = {
  user: UserType;
  token: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  register: async () => { },
  login: async () => { },
  logout: () => { },
});


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setToken(res.token);
    localStorage.setItem("token", res.token);

    setUser({
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      role: res.user.role,
      permissions: res.user.permissions
    });
  };

  const register = async (data: RegisterData) => {
    console.log("CONTEXT-register", data);
    
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log("AUTHCONTEXT-res", res);
    setToken(res.token);
    localStorage.setItem("token", res.token);

    setUser({
      id: res.user.id,
      name: res.user.name,
      email: res.user.email,
      role: res.user.role,
      permissions: res.user.permissions
    });
    // Después de registrarse, hacemos login automático
    await login(data.email, data.password);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};