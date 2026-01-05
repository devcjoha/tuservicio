"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { useModal } from "@/hooks/useModal";

export type Company = {
  id?: string; //opcional en el form 
  name: string;
  type: string;
  phone: string;
  email: string;
  rif: string;
  address: string;
  ownerId: string;
  logo?: FileList; // en el form será FileList 
  status: "active" | "inactive" | "paused";
}

export type CompanyContextType = {
  companies: Company[];
  createCompany: (data: FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { user, setUser, loading: userLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { open } = useModal();

  useEffect(() => {
    const initFetch = async () => {
      // Si Auth todavía está verificando el token, no hacemos nada aún
      if (userLoading) return;

      // Si ya terminó de cargar Auth y hay un usuario con rol privilegiado
      if (user && user.role !== "user") {
        const res = await getCompanies();
        setCompanies(res.companies)             
      } else {
        // Si no hay usuario o es rol 'user', nos aseguramos de que no haya basura en el estado
        setCompanies([]);
        setLoading(false);
      }
    };
    console.log(companies);
    console.log(user);

    initFetch();
    // ESCUCHAMOS user (por si cambia de nulo a objeto) y authLoading (para saber cuándo empezar)
  }, [user, userLoading]);

  const getCompanies = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await apiFetch("/companies", {
        method: "GET",
        timeout: 15000
      });
      setCompanies(res.companies || []);
      return res;
    } catch (error:any) {
      setCompanies([]);
      setError(error.message || "Error al crear Compañia");
      open({
        title: "Error de Creación de Compañía",
        message: error.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw error;
    } finally {
      setLoading(false);
    }
    
  };
  const createCompany = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/companies", {
        method: "POST",
        body: data,
        timeout: 15000
      });

      if (!res.company) {
        const apiError = res.message
        setError(apiError);
        open({
          title: "Error al crear la compañía",
          message: apiError,
          variant: "error",
          onClose: () => setError(null),
        });
        return null;
      }
      setUser(res.user)
      setCompanies((prev) => [...prev, res.company]);
      open({
        title: `Registro de ${res.company.name}`,
        message: res.message,
        variant: "success",
      });
      return res

    } catch (err: any) {
      setError(err.message || "Error al crear Compañia");
      open({
        title: "Error de Creación de Compañía",
        message: err.message,
        variant: "error",
        onClose: () => setError(null),
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return (
    <CompanyContext.Provider value={{ companies, createCompany, error, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompanies debe usarse dentro de CompanyProvider");
  return ctx;
};