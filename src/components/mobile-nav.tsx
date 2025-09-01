"use client"

import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { navLinks } from "./nav-links";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const mobileNavLinkClass =
    "flex items-center gap-3 rounded-md px-4 py-3 transition-colors duration-300 mobile-touch-target text-theme-secondary hover:text-[#3B82F6] hover:bg-white/15";

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-theme-primary border-b border-theme shadow-2xl z-50 md:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto px-6 py-6">
              <nav className="space-y-4">
                {navLinks
                  .filter((link) => link.showInMobile)
                  .map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={onClose}
                      className={cn(
                        mobileNavLinkClass,
                        link.href === "/" &&
                          "text-[#3B82F6] bg-[#3B82F6]/10 hover:bg-[#3B82F6]/10"
                      )}
                    >
                      {link.icon && <link.icon className="w-5 h-5" />}
                      <span className="text-base font-normal tracking-20-smaller">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                <div className="pt-4 border-t border-theme">
                  <Link to="/dashboard" onClick={onClose}>
                    <Button className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] h-12 px-4 py-3 rounded-md flex items-center justify-center gap-3 text-base tracking-20-smaller transition-all duration-300 font-normal mobile-touch-target">
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Client Area</span>
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
