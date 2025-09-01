import { ReactNode } from "react";
import { StickyNavbar } from "@/components/sticky-navbar";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden transition-colors duration-300">
      <StickyNavbar />
      {children}
    </div>
  );
}

