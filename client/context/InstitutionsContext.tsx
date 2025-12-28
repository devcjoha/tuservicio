"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";


export type Institution = {
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
        if (user && user.role === "owner" ) {
          const res = await apiFetch("/institutions", {
            method: "GET",
            timeout: 15000
          });
          setInstitutions(res.institutions);
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
        body: data,
        timeout: 15000
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