"use client";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/utils/combine";

export function MultiSelectCategories({ label, options, value = [], onChange, error }: any) {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    // Si el valor ya está, lo quitamos. Si no, lo agregamos.
    const newValue = value.includes(optionValue)
      ? value.filter((v: string) => v !== optionValue)
      : [...value, optionValue];

    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1 relative mb-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {/* Caja del Select */}
      <div
        onClick={() => setOpen(!open)}
        className={cn(
          "flex min-h-10.5 w-full items-center justify-between rounded-md border px-3 py-2 bg-white cursor-pointer transition-all",
          error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"
        )}
      >
        <div className="flex flex-wrap gap-1">
          {value.length > 0 ? (
            value.map((val: string) => (
              <span key={val} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                {options.find((o: any) => o.value === val)?.label || val}
                <X size={12} className="hover:text-red-500" onClick={(e) => { e.stopPropagation(); handleSelect(val); }} />
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">Selecciona categorías...</span>
          )}
        </div>
        <ChevronDown size={18} className={cn("text-gray-500 transition-transform", open && "rotate-180")} />
      </div>

      {/* Opciones */}
      {open && (
        <ul className="absolute z-50 top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-auto">
          {options.map((opt: any) => {
            const isSelected = value.includes(opt.value);
            return (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  "px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex justify-between items-center",
                  isSelected && "bg-blue-50 text-blue-700 font-medium"
                )}
              >
                {opt.label}
                {isSelected && <span className="text-xs">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
      {error && <span className="text-xs text-red-500 mt-1">{error.message}</span>}
    </div>
  );
};