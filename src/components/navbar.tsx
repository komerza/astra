"use client"

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Menu } from "lucide-react";
import { SearchButton } from "./search-button";
import { CartButton } from "./cart-button";
import { MobileNav } from "./mobile-nav";
import { StoreBanner } from "@/components/store-banner";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 z-50 w-full duration-500 transition-all ${
          isScrolled
            ? "header-blur bg-white/[0.01] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="page-container flex h-[70px] w-full items-center justify-between px-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <div className="flex flex-row items-center gap-2">
                <StoreBanner className="h-6 w-auto" />
                <div className="monument-bold relative flex flex-row items-end font-semibold tracking-[0.02em]">
                  <span className="text-white">komerza</span>
                  <span className="text-[#3B82F6]">.com</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden flex-row items-center sm:flex">
              <Link to="/products">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Products
                </button>
              </Link>
              <Link to="https://discord.com" target="_blank">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Discord
                </button>
              </Link>
              <Link to="/payment-methods">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Payment Methods
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex flex-row items-center gap-4">
            <SearchButton />
            <CartButton />
            {/* Dashboard Button - Desktop */}
            <Link to="/dashboard" className="hidden sm:block">
              <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#3B82F6] text-primary-foreground shadow hover:bg-[#3B82F6]/90 h-8 rounded-md px-3 text-xs">
                <UserPlus size={14} />
                Dashboard
              </button>
            </Link>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="duration-200 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 py-2 block sm:hidden px-2"
            >
              <Menu size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
