"use client";

import { useState } from "react";
import { cn } from "@/utils/combine";
import { ChevronDown } from "lucide-react";

export type Option = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  label?: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
  success?: boolean;
  errorMessage?: string;
  className?: string;
  optionClassName?: string;
};

export function CustomSelect({
  label,
  options,
  value,
  onChange,
  error,
  success,
  errorMessage,
  className,
  optionClassName,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);

  const base =
    "select-custom-base flex w-full border rounded-md px-3 py-2 bg-white focus:outline-none transition-all duration-200 cursor-pointer relative";

  const variant = error
    ? "border-red-500 focus:ring-2 focus:ring-red-500"
    : success
    ? "border-green-500 focus:ring-2 focus:ring-green-500"
    : "border-gray-300 focus:ring-2 focus:ring-";

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Seleccionar";

  return (
    <div className="flex flex-col relative">
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* Botón que abre/cierra el menú */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(base, variant, className)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="absolute right-3 top-1/12 mt-1.5 text-gray-700" />
      </button>

      {/* Lista de opciones */}
      {open && (
        <ul className="absolute z-10 top-15 w-full bg-white border border-transparent rounded-md shadow-lg h-auto overflow-auto">
          {options.map((opt, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={cn(
                "px-3 py-2 cursor-pointer hover:bg-blue-100 text-gray-700",
                optionClassName
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && errorMessage && (
        <span className="text-sm text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};