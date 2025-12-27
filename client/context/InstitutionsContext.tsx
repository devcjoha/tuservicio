"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";
// import { z } from "zod";
// import { institutionSchema } from "@/utils/validationSchemas";

export interface BaseInstitution {
  name: string;
  type: string;
  phone: string;
  email: string;
  rif: string;
  address: string;
  ownerId: string;
}
// 1. Para el Formulario (Input): Base + el logo como FileList
export type InstitutionForm = BaseInstitution & {
  logo: FileList;
};
// 2. Para la API (Output): Base + logo como string + ID y estado
export type Institution = BaseInstitution & {
  id: string; // Aquí está el ID de la base de datos
  logo: string; // Aquí es la ruta/URL
  active: boolean;
};


export type InstitutionContextType = {
  institutions: Institution[];
  createInstitution: (data: FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
};

export const InstitutionContext = createContext<InstitutionContextType | null>(null);

export const InstitutionProvider = ({ children }: { children: React.ReactNode }) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getInstitutions = async () => {
      setLoading(true);
      try {

        if (user?.id && user.role === "owner") {
          const res = await  apiFetch(`/institutions`)
            setInstitutions(res.institutions || []);
        
        }
      } catch (error) {
        setInstitutions([])
      } finally {
        setLoading(false);
      }
    }
    getInstitutions();
  }, [user]);

  const createInstitution = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/institutions", {
        method: "POST",
        // body: JSON.stringify(data),
        body: data,
      });

      if (res.institution) {
        setUser(res.user)
        setInstitutions((prev) => [...prev, res.institution]);
      }

    } catch (err: any) {
      setError(err.message || "InstitutionContext: Error al crear institución");
    } finally {
      setLoading(false);
    }
  };


  return (
    <InstitutionContext.Provider value={{ institutions, createInstitution, error, loading }}>
      {children}
    </InstitutionContext.Provider>
  );
};

export const useInstitutions = () => {
  const ctx = useContext(InstitutionContext);
  if (!ctx) throw new Error("useInstitutions debe usarse dentro de InstitutionProvider");
  return ctx;
};