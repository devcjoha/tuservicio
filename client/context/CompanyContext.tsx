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
  active?: boolean; // opcional, lo devuelve la API 
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
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { open } = useModal();

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (user && user.role === "owner") {
          const res = await apiFetch("/companies", {
            method: "GET",
            timeout: 15000
          });
          setCompanies(res.companies);
          return res;
        }
      } catch (error) {
        setCompanies([])
        setError("No se pudieron cargar las compañías");
      } finally {
        setLoading(false);
      }
    }
    getCompanies();
  }, [user]);

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
          title: "Error de autenticación",
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