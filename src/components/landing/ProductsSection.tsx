"use client"

import { Link } from "react-router-dom"
import { SmilePlus, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LandingProductsClient } from "@/components/landing-products-client"

export function ProductsSection() {
  return (
    <section
      id="products"
      className="relative flex w-full flex-col gap-4 py-12 sm:py-16"
    >
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
        <Link to="/products">
          <Button className="w-full sm:w-auto bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 sm:h-8 px-6 sm:px-4 py-3 sm:py-2 rounded-md flex items-center justify-center gap-2 text-base sm:text-sm tracking-20-smaller transition-all duration-300 font-normal max-w-xs">
            <Package className="w-5 h-5 sm:w-4 sm:h-4" />
            <span>View All Products</span>
          </Button>
        </Link>
      </div>
    </section>
  )
}

