import Link from "next/link"
import { ArrowUpRight, Package, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { SmilePlus, ShoppingCart } from "lucide-react";
import { ParticleRiver } from "./components/particle-river";
import { LandingProductsClient } from "./components/landing-products-client";
import { StickyHeader } from "./components/sticky-header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden transition-colors duration-300">
      {/* Glowing effects */}
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>

      {/* Sticky Header */}
      <StickyHeader />

      {/* Hero Section */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero-new.webp" alt="Hero Background" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/20 via-theme-primary/60 to-theme-primary"></div>
        </div>

        {/* Grid Background Overlay */}
        <div className="absolute inset-0 z-1">
          <Image src="/grid-background.png" alt="Grid Background" fill className="object-cover opacity-5" />
        </div>

        {/* Particle River Effect */}
        <div className="absolute inset-0 h-full w-full z-5">
          <ParticleRiver />
        </div>

        {/* Top Glow Effect */}
        <div className="absolute left-[50%] top-[-20%] z-5 h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] translate-x-[-50%] bg-[#3B82F6] blur-[200px] opacity-80"></div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Trusted By Badge */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative transform scale-100 sm:scale-107">
              <span className="text-theme-primary">Trusted By Komerza.com</span>
              <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
                <svg
                  height="10"
                  width="10"
                  className="sm:h-3 sm:w-3"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="currentColor">
                    <path
                      d="M9 1.75L11.24 6.289L16.25 7.017L12.625 10.551L13.481 15.54L9 13.185L4.519 15.54L5.375 10.551L1.75 7.017L6.76 6.289L9 1.75Z"
                      fill="currentColor"
                      fillOpacity="0.3"
                      stroke="none"
                    ></path>
                    <path
                      d="M9 1.75L11.24 6.289L16.25 7.017L12.625 10.551L13.481 15.54L9 13.185L4.519 15.54L5.375 10.551L1.75 7.017L6.76 6.289L9 1.75Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-theme-primary text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center mx-auto mb-4 sm:mb-6 leading-tight max-w-5xl heading-semibold drop-shadow-2xl">
            Transform your ideas into
            <br />
            Reality with <span className="text-[#3B82F6]">Komerza</span>
          </h1>

          {/* Subheading */}
          <p className="text-theme-secondary text-sm sm:text-base text-center max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed drop-shadow-lg px-4">
            Expert web development services for stunning online experiences.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <Link href="/products">
              <Button className="w-full sm:w-auto bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 rounded-md flex items-center justify-center gap-2 text-base sm:text-sm tracking-20-smaller transition-all duration-300 shadow-lg font-normal">
                <ArrowUpRight className="w-5 h-5 sm:w-4 sm:h-4" />
                <span>Products</span>
              </Button>
            </Link>

            <Link href="/status">
              <Button className="w-full sm:w-auto glass-theme hover:bg-gray-300 dark:hover:bg-white/10 text-theme-primary h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 tracking-20-smaller border border-theme rounded-md flex items-center justify-center gap-2 text-base sm:text-sm transition-all duration-300 font-normal">
                <span>Status</span>
                <svg
                  height="18"
                  width="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-4 sm:h-4"
                >
                  <g fill="currentColor">
                    <path
                      d="M7.93903 13.72C8.52503 13.134 9.47503 13.134 10.06 13.72"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M5.81799 11.598C7.57499 9.84099 10.425 9.84099 12.182 11.598"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M3.69702 9.47699C6.62602 6.54799 11.375 6.54799 14.304 9.47699"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M1.57501 7.35599C5.67601 3.25499 12.324 3.25499 16.424 7.35599"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                    ></path>
                  </g>
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Products Section */}
      <section id="products" className="relative flex w-full flex-col gap-4 py-12 sm:py-16">
        {/* Background effects */}
        <div className="pointer-events-none absolute -left-[20%] top-0 z-10 h-64 w-64 sm:h-96 sm:w-96 animate-pulse rounded-full bg-gradient-to-br from-transparent via-transparent to-[#3B82F6] blur-[100px] duration-5000"></div>
        <div className="pointer-events-none absolute -right-[20%] bottom-0 z-40 h-64 w-[400px] sm:h-96 sm:w-[700px] -rotate-45 animate-pulse rounded-full bg-gradient-to-br from-rose-500/20 via-transparent to-[#3B82F6]/30 blur-[100px] duration-5000"></div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-2 px-4">
            {/* Badge */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative transform scale-100 sm:scale-107">
                <span className="text-theme-primary">Best Seller Products</span>
                <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
                  <SmilePlus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-2xl sm:text-3xl heading-semibold text-theme-primary">
              Best Seller Products
            </h2>
            <p className="max-w-xl text-center text-xs text-theme-secondary">
              Products that are loved by our customers
            </p>
          </div>
        </div>

          {/* Products Grid */}
          <div className="container mx-auto mt-6 sm:mt-8 px-4 sm:px-6">
            <LandingProductsClient />
          </div>

          {/* View All Button */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center px-4">
          <Link href="/products">
            <Button className="w-full sm:w-auto bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 rounded-md flex items-center justify-center gap-2 text-base sm:text-sm tracking-20-smaller transition-all duration-300 font-normal max-w-xs">
              <Package className="w-5 h-5 sm:w-4 sm:h-4" />
              <span>View All Products</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* FAQ Badge */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative transform scale-100 sm:scale-107">
              <span className="text-theme-primary">FAQ</span>
              <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
                <HelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl sm:text-3xl heading-semibold text-theme-primary">Frequently Asked Questions</h2>
            <p className="text-xs text-theme-secondary mt-2">Get answers to common questions</p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#3B82F6]/75 to-transparent mb-12 sm:mb-16"></div>

          {/* FAQ Grid */}
          <div className="grid max-w-4xl grid-cols-1 gap-8 sm:gap-12 mx-auto lg:grid-cols-2">
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What hardware do you support?
                </h3>
                <p className="text-sm text-theme-secondary">
                  This varies depending on the cheat you are using. Please refer to the product page for more
                  information.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What payment methods do you support?
                </h3>
                <p className="text-sm text-theme-secondary">
                  We accept cryptocurrency and all major credit cards. Card payments are processed securely through
                  Stripe.
                </p>
              </div>
            </div>
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  What operating systems do you support?
                </h3>
                <p className="text-sm text-theme-secondary">
                  This varies depending on the cheat you are using. Please refer to the product page for more
                  information.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg leading-6 text-gray-900 dark:text-white mb-3 sm:mb-4">
                  My question isn't listed here, what do I do?
                </h3>
                <p className="text-sm text-theme-secondary">
                  If you require further support, you can contact us on our Discord server.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-theme bg-theme-primary">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image src="/kimera-logo.svg" alt="Komerza" width={120} height={48} className="h-6 sm:h-8 w-auto" />
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 mb-4 md:mb-0">
              <Link
                href="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-theme">
            <p className="text-center text-xs text-theme-secondary tracking-20-smaller">
              © 2025 Komerza. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
