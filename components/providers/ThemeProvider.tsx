"use client";

import { useTheme } from "@/lib/hooks/useTheme";
import { useCallback, useEffect } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  const applyTheme = useCallback((currentTheme: "dark" | "light") => {
    const root = document.documentElement;

    if (currentTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  return <>{children}</>;
}
