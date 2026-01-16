"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
import { useModal } from "@/hooks/useModal";
import { LoadingDots } from "@/components/feedbacks/LoadingDots";

export type Company = {
  // companies: Company | null;
  // company: Company;
  id?: string; //opcional en el form 
  name: string;
  phone: string;
  isPhoneVerified: boolean;
  phoneVerificationCode: string;
  email: string;
  rif: string;
  address: string;
  ownerId: string;
  logo?: {
    url: string;
    public_id: string;
  };// en el form será FileList 
  status: "active" | "inactive" | "paused";
  categories: string[];
  businessModel: "Oficio-Independiente" | "Empresa" | "Cooperativa" | "Profesional-independiente";
}

export type CompanyContextType = {
  companies: Company[];
  company: Company | null;
  createCompany: (data: FormData) => Promise<Company | null>;
  getCompanyById: (id: string) => Promise<Company | null>;
  loading: boolean;
  error: string | null;
};

export const CompanyContext = createContext<CompanyContextType | null>(null);

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const { user, setUser, loading: userLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const { open } = useModal();
// console.log("COMPANY CONTEXT", user);

  useEffect(() => {
    const initFetch = async () => {

      if (userLoading) {return <LoadingDots/>};

      if (user && user.role === "owner") {
        await getCompanyById(user._id);
      } else if (user && user.role === "admin" || user?.role === "superadmin") {
        await getCompanies();

      } else {

        setCompanies([]);
        setLoading(false);
      }
    };
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
    } catch (error: any) {
      setCompanies([]);
      setError(error.message || "Error al crear Empresa");
      open({
        title: "Error de Creación de Empresa",
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

  const getCompanyById = async(id:string) => {
    setLoading(true);
    try {
       const res = await apiFetch(`/companies/${id}`, {
        method: "GET",
      });
      const data = Array.isArray(res.company) ? res.company[0] : res.company;
      setCompany(data);
      console.log(data);
      
      return res.company; // Retorna la compañía específica
    } catch (error: any) {
      setError(error.message || "Error al obtener la compañía");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ companies, company, createCompany, getCompanyById, error, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanies = () => {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompanies debe usarse dentro de CompanyProvider");
  return ctx;
};