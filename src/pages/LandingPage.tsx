"use client";

import { Link } from "react-router-dom";
import { StickyHeader } from "@/components/sticky-header";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProductsSection } from "@/components/landing/ProductsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { useEffect, useState } from "react";

export default function LandingPage() {
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
    <div className="min-h-screen bg-theme-primary relative overflow-hidden transition-colors duration-300">
      {/* Glowing effects */}
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>

      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <ProductsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <footer className="relative border-t border-theme bg-theme-primary">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={bannerUrl} alt="Komerza" className="h-6 w-auto" />
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 mb-4 md:mb-0">
              <Link
                to="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                to="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-theme">
            <p className="text-center text-xs text-theme-secondary tracking-20-smaller">
              © 2025 Komerza UAB. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
