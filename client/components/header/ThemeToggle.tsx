"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 p-2 flex items-center justify-center cursor-pointer"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};