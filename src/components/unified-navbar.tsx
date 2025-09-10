"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, HelpCircle, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartButton } from "./cart-button";
import { SearchButton } from "./search-button";

export function UnifiedNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerUrl, setBannerUrl] = useState("/komerza-logo.png");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    async function getBanner() {
      try {
        const url = await (globalThis as any).komerza.getStoreBannerUrl();
        if (url) {
          setBannerUrl(url);
        }
      } catch (error) {
        console.warn("Failed to load store banner, using fallback:", error);
      }
    }

    getBanner();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLandingPage = location.pathname === "/";
  const isProductsPage = location.pathname === "/products";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-200 border-gray-800 ${
        isScrolled
          ? "bg-black/75 backdrop-blur-md border-b shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img src={bannerUrl} alt="Komerza" className="h-8 w-auto" />
          </Link>

          <div className="items-center gap-4 hidden md:flex">
            <Link
              to="/"
              className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors duration-300 ${
                isLandingPage
                  ? "text-primary hover:text-primary hover:bg-primary/10 bg-primary/10"
                  : "text-theme-secondary hover:text-primary hover:bg-primary/10 bg-transparent"
              }`}
            >
              <Home className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Home
              </span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors duration-300 ${
                isProductsPage
                  ? "text-primary hover:text-primary hover:bg-primary/10 bg-primary/10"
                  : "text-theme-secondary hover:text-primary hover:bg-primary/10 bg-transparent"
              }`}
            >
              <Package className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Products
              </span>
            </Link>
            <Link
              to="/dashboard/support"
              className="text-theme-secondary hover:text-primary hover:bg-primary/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <HelpCircle className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Support
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchButton />
          <div className="hidden md:flex items-center gap-4">
            <CartButton />
            <Link to="/dashboard">
              <Button className="bg-primary text-white hover:bg-primary-600 h-8 px-4 py-2 rounded-md flex items-center gap-2 text-sm tracking-20-smaller transition-all duration-300 font-normal">
                <span>Client Area</span>
                <ArrowRight className="w-[18px] h-[18px]" />
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 h-auto text-theme-secondary hover:text-primary hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              to="/"
              className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-300 ${
                isLandingPage
                  ? "text-primary bg-primary/10"
                  : "text-theme-secondary hover:text-primary hover:bg-primary/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span className="text-base font-normal">Home</span>
            </Link>
            <Link
              to="/products"
              className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-300 ${
                isProductsPage
                  ? "text-primary bg-primary/10"
                  : "text-theme-secondary hover:text-primary hover:bg-primary/10"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span className="text-base font-normal">Products</span>
            </Link>
            <Link
              to="/dashboard/support"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-theme-secondary hover:text-primary hover:bg-primary/10 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-base font-normal">Support</span>
            </Link>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
              <div className="flex justify-center">
                <CartButton />
              </div>
              <Link
                to="/dashboard"
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-primary text-white hover:bg-primary-600 h-10 px-4 py-2 rounded-md flex items-center justify-center gap-2 text-base transition-all duration-300 font-normal">
                  <span>Client Area</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
