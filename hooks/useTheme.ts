"use client";
import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "dim";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("ms-theme") as Theme) || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const applyTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("ms-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  };

  return { theme, applyTheme };
}
