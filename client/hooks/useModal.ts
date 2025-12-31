// hooks/useModal.ts
import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";

export function useModal() {
  const contextMod = useContext(ModalContext);
  if (!contextMod) throw new Error("useGlobalModal debe usarse dentro de ModalProvider");
  return contextMod;
};