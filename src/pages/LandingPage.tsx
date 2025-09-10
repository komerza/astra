"use client";

import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Package,
  HelpCircle,
  MessageCircleQuestionIcon,
  SparklesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmilePlus } from "lucide-react";
import { ParticleRiver } from "@/components/particle-river";
import { LandingProductsClient } from "@/components/landing-products-client";
import { UnifiedNavbar } from "@/components/unified-navbar";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [bannerUrl, setBannerUrl] = useState("/komerza-logo.png"); // Default fallback

  useEffect(() => {
    async function getBanner() {
      try {
        const url = await (globalThis as any).komerza.getStoreBannerUrl();
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
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl opacity-10"></div>

      <UnifiedNavbar />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.webp"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/20 via-theme-primary/60 to-theme-primary"></div>
        </div>

        <div className="absolute inset-0 z-1">
          <img
            src="/hero-grid.png"
            alt="Grid Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="absolute inset-0 h-full w-full z-5">
          <ParticleRiver />
        </div>

        <div className="absolute left-[50%] top-[-20%] z-5 h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] translate-x-[-50%] bg-primary blur-[200px] opacity-80"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary-500 rounded-full px-4 py-2 text-xs">
              <SparklesIcon className="w-4 h-4 text-primary" />
              <span className="text-theme-primary">
                Fresh Updates & New Features
              </span>
            </div>
          </div>

          <h1 className="text-theme-primary text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mx-auto mb-4 sm:mb-6 leading-tight max-w-5xl heading-semibold drop-shadow-2xl">
            Transform your ideas into
            <br />
            Reality with <span className="text-primary">Komerza</span>
          </h1>

          <p className="text-theme-secondary text-sm sm:text-base text-center max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow-lg px-4">
            Expert web development services for stunning online experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <Link to="/products">
              <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary-600 h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 rounded-md flex items-center justify-center gap-2 text-base sm:text-sm tracking-20-smaller transition-all duration-300 shadow-lg font-normal">
                <ArrowUpRight className="w-5 h-5 sm:w-4 sm:h-4" />
                <span>Products</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <section
        id="products"
        className="relative flex w-full flex-col gap-4 py-12 sm:py-16"
      >
        <div className="pointer-events-none absolute -left-[20%] top-0 z-10 h-64 w-64 sm:h-96 sm:w-96 animate-pulse rounded-full bg-gradient-to-br from-transparent via-transparent to-primary blur-[100px] duration-5000"></div>
        <div className="pointer-events-none absolute -right-[20%] bottom-0 z-40 h-64 w-[400px] sm:h-96 sm:w-[700px] -rotate-45 animate-pulse rounded-full bg-gradient-to-br from-rose-500/20 via-transparent to-primary/30 blur-[100px] duration-5000"></div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 px-4">
            <h2 className="text-center text-2xl sm:text-3xl heading-semibold text-theme-primary">
              Best Seller Products
            </h2>
            <p className="max-w-xl text-center text-xs text-theme-secondary">
              Products that are loved by our customers
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-6 sm:mt-8 px-4 sm:px-6">
          <LandingProductsClient />
        </div>

        <div className="mt-6 sm:mt-8 flex items-center justify-center px-4">
          <Link to="/products">
            <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary-600 h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 rounded-md flex items-center justify-center gap-2 text-base sm:text-sm tracking-20-smaller transition-all duration-300 font-normal max-w-xs">
              <Package className="w-5 h-5 sm:w-4 sm:h-4" />
              <span>View All Products</span>
            </Button>
          </Link>
        </div>
      </section>

      <section className="relative py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl heading-semibold text-theme-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-theme-secondary mt-2">
              Get answers to common questions
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/75 to-transparent mb-12 sm:mb-16"></div>

          <div className="grid max-w-4xl grid-cols-1 gap-8 sm:gap-12 mx-auto lg:grid-cols-2">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What hardware do you support?
                </h3>
                <p className="text-sm text-theme-secondary">
                  This varies depending on the software you are using. Please
                  refer to the product page for more information.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What payment methods do you support?
                </h3>
                <p className="text-sm text-theme-secondary">
                  We accept cryptocurrency and all major credit cards. Card
                  payments are processed securely through Stripe.
                </p>
              </div>
            </div>
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What operating systems do you support?
                </h3>
                <p className="text-sm text-theme-secondary">
                  This varies depending on the software you are using. Please
                  refer to the product page for more information.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  My question isn't listed here, what do I do?
                </h3>
                <p className="text-sm text-theme-secondary">
                  If you require further support, you can contact us in the
                  "Support" section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-theme bg-theme-primary">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={bannerUrl} alt="Komerza" className="h-8 w-auto" />
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 mb-4 md:mb-0">
              <Link
                to="#"
                className="text-theme-secondary hover:text-primary text-sm tracking-20-smaller transition-colors duration-300"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-theme-secondary hover:text-primary text-sm tracking-20-smaller transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                to="#"
                className="text-theme-secondary hover:text-primary text-sm tracking-20-smaller transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-theme">
            <p className="text-center text-xs text-theme-secondary tracking-20-smaller">
              &copy; 2025 Komerza. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
