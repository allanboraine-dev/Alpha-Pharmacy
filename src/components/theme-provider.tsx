"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void; resolvedTheme: string }>({
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light"
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children, defaultTheme = "system" }: any) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem("alpha-theme") as Theme | null;
    if (stored) {
      setThemeState(stored);
    } else {
      setThemeState(defaultTheme);
    }
  }, [defaultTheme]);

  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    const isDark = 
      theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, mounted]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    window.localStorage.setItem("alpha-theme", t);
  };

  const resolvedTheme = theme === "system" 
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
