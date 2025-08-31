"use client";

import { Link } from "react-router-dom";
import { Home, Package, Activity } from "lucide-react";
import { CartButton } from "@/components/cart-button";
import { MobileNav } from "@/components/mobile-nav";
import { SearchButton } from "@/components/search-button";
import { useEffect, useState } from "react";

export function ProductsHeader() {
  const [bannerUrl, setBannerUrl] = useState("/komerza-logo.png"); // Default fallback

  useEffect(() => {
    async function getBanner() {
      try {
        const url = await globalThis.komerza.getStoreBannerUrl();
        if (url) {
          setBannerUrl(url);
        }
      } catch (error) {
        console.warn("Failed to load store banner, using fallback:", error);
        // Keep the default banner
      }
    }

    getBanner();
  }, []);

  return (
    <header className="h-16 flex items-center justify-between container mx-auto top-0 absolute inset-x-0 z-50 px-4 sm:px-6">
      <div className="flex items-center space-x-8">
        <Link to="/">
          <img src={bannerUrl} alt="Komerza" className="h-6 w-auto" />
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
        <MobileNav />
      </div>
    </header>
  );
}
