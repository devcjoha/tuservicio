// context/ModalContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { Modal, ModalVariant } from "@/components/ui/Modal";

type OpenParams = {
  title?: string;
  message?: string;
  variant?: ModalVariant;
  content?: React.ReactNode;
  onClose?: () => void;
};

type ModalState = {
  isOpen: boolean;
  title?: string;
  message?: string | null;
  variant: ModalVariant;
  content?: React.ReactNode;
};

type ModalAPI = {
  open: (params: OpenParams) => void;
  close: () => void;
} & ModalState;

export const ModalContext = createContext<ModalAPI | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ModalState>({
    isOpen: false,
    title: "",
    message: "",
    variant: "form",
    content: "",
  });

  const open: ModalAPI["open"] = ({ title, message, variant = "form", content } = {}) => {
    setState({ isOpen: true, title, message: message, variant, content });
  };

  const close = () => {
    setState((state) => ({ ...state, isOpen: false, message: "", content: "" }));
  };

  return (
    <ModalContext.Provider value={{ ...state, open, close }}>
      {children}
      <Modal isOpen={state.isOpen} onClose={close} title={state.title} variant={state.variant}>
        {state.content ?? (state.message ? <p>{state.message}</p> : null)}
      </Modal>
    </ModalContext.Provider>
  );
};