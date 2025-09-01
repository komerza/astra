"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/lib/use-search";
import { MobileSearch } from "./search/mobile-search";
import { DesktopSearch } from "./search/desktop-search";

export function SearchButton() {
  const search = useSearch();
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) {
    return (
      <Button className="bg-transparent border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 h-8 w-8 p-0 rounded-md transition-all duration-300">
        <Search className="w-4 h-4" />
      </Button>
    );
  }

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-[#050505]" : "bg-white";
  const borderClass = isDark ? "border-white/20" : "border-gray-300";
  const textPrimaryClass = isDark ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDark ? "text-[#808080]" : "text-gray-600";
  const hoverBgClass = isDark ? "hover:bg-white/10" : "hover:bg-gray-100";
  const inputBgClass = isDark ? "bg-[#050505]" : "bg-white";
  const kbdBgClass = isDark ? "bg-white/5" : "bg-gray-100";

  if (isMobile) {
    return (
      <MobileSearch
        {...search}
        textPrimaryClass={textPrimaryClass}
        textSecondaryClass={textSecondaryClass}
        hoverBgClass={hoverBgClass}
        bgClass={bgClass}
        borderClass={borderClass}
      />
    );
  }

  return (
    <DesktopSearch
      {...search}
      textPrimaryClass={textPrimaryClass}
      textSecondaryClass={textSecondaryClass}
      hoverBgClass={hoverBgClass}
      bgClass={bgClass}
      borderClass={borderClass}
      inputBgClass={inputBgClass}
      kbdBgClass={kbdBgClass}
    />
  );
}

