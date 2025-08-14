"use client"

import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    // Force dark mode on mount and remove any light theme classes
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }, []);

  // Return null since we don't want to show any toggle button
  return null;
}
