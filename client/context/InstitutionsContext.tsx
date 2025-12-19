"use client";

import { createContext, useContext, useState } from "react";
import { UserType } from "./AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/lib/api";

export type Institution = {
  id: string;
  name: string;
  type: string;
  email: string;
  phone: string;
  address: string;
  rif: string;
  logo?: string;
};

export type InstitutionContextType = {
  institutions: Institution[];
  createInstitution: (data: Omit<Institution, "id">) => Promise<void>;
};

const InstitutionContext = createContext<InstitutionContextType | null>(null);

export const InstitutionProvider = ({ children }: { children: React.ReactNode }) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const { user, setUser } = useAuth();
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


 const createInstitution = async (data:  Omit<Institution, "id"> ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch("/institutions", {
        method: "POST",
        body: JSON.stringify(data ),
      });
      const result = await res.json();

      if(result.institution){
        setInstitutions((prev) => [...prev, res.institution]);
        setUser(result.user)
      }
      console.log("INST CONTEXT", institutions);
      
    } catch (err: any) {
    setError(err.message || "InstitutionContext: Error al crear institución");
  } finally {
    setLoading(false);
  }
  };

  return (
    <InstitutionContext.Provider value={{ institutions, createInstitution }}>
      {children}
    </InstitutionContext.Provider>
  );
};

export const useInstitutions = () => {
  const ctx = useContext(InstitutionContext);
  if (!ctx) throw new Error("useInstitutions debe usarse dentro de InstitutionProvider");
  return ctx;
};