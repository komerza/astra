"use client";

import { useState, useEffect } from "react";
import { useSearch } from "@/lib/use-search";
import { MobileSearch } from "@/components/search/mobile-search";
import { DesktopSearch } from "@/components/search/desktop-search";

export function SearchButton() {
  const search = useSearch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileSearch {...search} /> : <DesktopSearch {...search} />;
}

