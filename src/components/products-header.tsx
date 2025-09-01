"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Package, Menu } from "lucide-react";
import { CartButton } from "@/components/cart-button";
import { MobileNav } from "@/components/mobile-nav";
import { SearchButton } from "@/components/search-button";
import { StoreBanner } from "@/components/store-banner";

export function ProductsHeader() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between container mx-auto top-0 absolute inset-x-0 z-50 px-4 sm:px-6">
      <div className="flex items-center space-x-8">
        <Link to="/">
          <StoreBanner className="h-6 w-auto" />
        </Link>
        <div className="items-center gap-4 hidden md:flex">
          <Link
            to="/"
            className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
          >
            <Home className="w-[18px] h-[18px]" />
            <span className="text-sm font-normal tracking-20-smaller">
              Home
            </span>
          </Link>
          <Link
            to="/products"
            className="text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-[#3B82F6]/10 px-2.5 py-1.5 transition-colors duration-300"
          >
            <Package className="w-[18px] h-[18px]" />
            <span className="text-sm font-normal tracking-20-smaller">
              Products
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SearchButton />
        <div className="hidden md:flex items-center gap-4">
          <CartButton />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <CartButton />
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
}
