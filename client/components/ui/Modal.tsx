// components/ui/Modal.tsx
"use client";
import React, { ReactNode } from "react";
import { BellRing, MessageCircleWarning, SquareCheckBig, TriangleAlert, X } from "lucide-react";
import Logo from "../icons/Logo";


export type ModalVariant = "form" | "error" | "warning" | "info" | "success";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  variant?: ModalVariant;
  children?: React.ReactNode;
};

const variantStyles: Record<ModalVariant, string> = {
  form: "bg-white border border-gray-200",
  error: "bg-red-50 border border-red-400",
  warning: "bg-yellow-50 border border-yellow-400",
  info: "bg-background border border-blue-400",
  success: "bg-background opacity-30 border border-green-400",
};

const titleColors: Record<ModalVariant, string> = {
  form: "text-gray-900",
  error: "text-red-700",
  warning: "text-yellow-700",
  info: "text-blue-700",
  success: "text-green-700",
};

const variantAnimations: Record<ModalVariant, string> = {
  form: "animate-slide-up",
  error: "animate-shake",
  warning: "animate-fade-in",
  info: "animate-zoom-in",
  success: "animate-zoom-in",
};
const icon: Record<ModalVariant, ReactNode> = {
  form: <Logo/>,
  error: <TriangleAlert className="text-red-700" />,
  warning: <MessageCircleWarning className="text-warning" />,
  info: <BellRing className="text-success" />,
  success: <SquareCheckBig className="text-green-700" />,
};
export function Modal({ isOpen, onClose, title, variant = "form", children }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-bg fixed inset-0 z-50 flex flex-row items-center justify-center bg-opacity-10 bg-slate-100/10 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`box-modal flex flex-col rounded-lg shadow-lg w-full max-w-lg p-4 relative ${variantStyles[variant]} ${variantAnimations[variant]}`}
      >
        <button onClick={onClose} aria-label="Cerrar modal" className="flex justify-end rounded ">
          <X className="w-5 h-5 hover:bg-gray-100" />
        </button>
        <div className="flex flex-col justify-left items-start ml-5 space-y-3">
          <div className="flex">
            {icon[variant]}
          </div>
          {title && <h2 className={`text-lg font-semibold ${titleColors[variant]}`}>{title}</h2>}
        </div>
        <div className="p-5">{children}</div>

      </div>
    </div>
  );
};
