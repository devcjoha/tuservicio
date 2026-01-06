// components/DashboardCard.tsx
import { cn } from "@/utils/combine";
import React from "react";
import { Button } from "./Button";
import { Status } from "@/context/AuthContext";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: Status;
  actions?: { label: string; onClick: () => void }[];
  children?: React.ReactNode;
  className?: string;
  variant?: Variant;
}

const statusColors: Record<Status, string> = {
  active: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  inactive: "bg-red-100 text-red-700",
  "":""
};

const variantStyles: Record<Variant, string> = {
  primary: "text-neutral-50 transition",
  secondary: "text-neutral-900 transition",
  ghost: "bg-transparent text-neutral-700",
  danger: "bg-error text-white transition",
};

const base =
  "px-3 py-2 border border-gray-100  text-fontColor rounded-md shadow-md cursor-pointer";

export function DashboardCard({
  title,
  description,
  icon,
  status = "active",
  actions = [],
  className,
  variant = "primary",
  children,
}: DashboardCardProps) {


  return (
    <div className={cn(base, variantStyles[variant], className)}>
      <div className="">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-semibold text-gray-400">{title}</h3>
        </div>
        <span
          className={`px-2 py-1 text-sm font-medium rounded ${statusColors[status]}`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {description && (
        <p className="text-gray-400">{description}</p>
      )}

      {actions.length > 0 && (
        <div className="flex gap-2 mt-2">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              onClick={action.onClick}
              variant="secondary"
              className="hover:bg-amber-200"
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {children && <div>{children}</div>}
    </div>
  );
};