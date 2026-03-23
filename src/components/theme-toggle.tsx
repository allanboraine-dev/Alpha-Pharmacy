"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-muted text-muted-foreground hover:text-[var(--color-alpha-green)] hover:bg-accent transition-colors shadow-sm"
      title="Toggle Dark Mode"
    >
      {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
