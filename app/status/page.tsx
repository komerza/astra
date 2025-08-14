"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Home,
  Package,
  HelpCircle,
  LayoutDashboard,
  Shield,
  AlertTriangle,
  RefreshCw,
  Activity,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CartButton } from "@/app/components/cart-button"
import { MobileNav } from "@/app/components/mobile-nav"
import { SearchButton } from "@/app/components/search-button"
import { ThemeToggle } from "@/app/components/theme-toggle"

// Status data for products organized by game
const productStatusesByGame = {
  "Software": [
    {
      id: "code-editor-pro",
      name: "Premium Code Editor",
      status: "undetected",
      lastUpdated: "2 hours ago",
      version: "v2.4.1", 
      undetectedSince: "Always Available",
      price: 4.99,
      image: "/product-placeholder.png",
    },
    {
      id: "productivity-suite-lite",
      name: "Productivity Suite Lite",
      status: "updating",
      lastUpdated: "15 minutes ago",
      version: "v1.8.3",
      undetectedSince: "Since Launch",
      price: 4.99,
      image: "/product-placeholder.png",
    },
    {
      id: "analytics-dashboard-pro", 
      name: "Analytics Dashboard Pro",
      status: "undetected",
      lastUpdated: "1 hour ago",
      version: "v3.1.0",
      undetectedSince: "Always Available",
      price: 5.99,
      image: "/product-placeholder.png",
    },
  ],
  "Templates": [
    {
      id: "website-template-pack",
      name: "Website Template Pack",
      status: "updating",
      lastUpdated: "30 minutes ago",
      version: "v1.5.2",
      undetectedSince: "Always Available",
      price: 6.99,
      image: "/product-placeholder.png",
    },
    {
      id: "ui-component-library",
      name: "UI Component Library",
      status: "undetected",
      lastUpdated: "2 hours ago",
      version: "v2.1.0",
      undetectedSince: "Since Launch",
      price: 8.99,
      image: "/product-placeholder.png",
    },
  ],
  "Digital Assets": [
    {
      id: "graphics-pack-premium",
      name: "Graphics Pack Premium",
      status: "undetected",
      lastUpdated: "1 hour ago",
      version: "v3.2.1",
      undetectedSince: "Always Available",
      price: 12.99,
      image: "/product-placeholder.png",
    },
  ],
  "E-books": [
    {
      id: "business-guide-complete",
      name: "Complete Business Guide",
      status: "risky",
      lastUpdated: "6 hours ago",
      version: "v1.4.3",
      undetectedSince: "Recently Updated",
      price: 7.99,
      image: "/product-placeholder.png",
    },
  ],
}

const gameCategories = ["All", "Software", "Templates", "Digital Assets", "E-books"]

const getStatusInfo = (status: string) => {
  switch (status) {
    case "undetected":
      return {
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        icon: Shield,
        label: "Available",
        description: "Ready to download",
      }
    case "updating":
      return {
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        icon: RefreshCw,
        label: "Updating",
        description: "Maintenance in progress",
      }
    case "risky":
      return {
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        icon: AlertTriangle,
        label: "Limited",
        description: "Temporary restrictions",
      }
    default:
      return {
        color: "text-gray-500",
        bgColor: "bg-gray-500/10",
        borderColor: "border-gray-500/30",
        icon: Activity,
        label: "Unknown",
        description: "Status unavailable",
      }
  }
}

export default function StatusPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  // Get all products or filter by category
  const getFilteredProducts = () => {
    if (activeCategory === "All") {
      return Object.entries(productStatusesByGame).flatMap(([game, products]) =>
        products.map((product) => ({ ...product, game })),
      )
    }
    return (
      productStatusesByGame[activeCategory as keyof typeof productStatusesByGame]?.map((product) => ({
        ...product,
        game: activeCategory,
      })) || []
    )
  }

  const filteredProducts = getFilteredProducts()

  // Calculate stats
  const allProducts = Object.values(productStatusesByGame).flat()
  const undetectedCount = allProducts.filter((p) => p.status === "undetected").length
  const updatingCount = allProducts.filter((p) => p.status === "updating").length
  const riskyCount = allProducts.filter((p) => p.status === "risky").length

  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      {/* Glowing effects */}
      <div className="absolute top-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-green-500 rounded-full blur-3xl opacity-10"></div>

      {/* Header */}
      <header className="h-16 flex items-center justify-between container mx-auto top-0 absolute inset-x-0 z-50 px-4 sm:px-6">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/kimera-logo.svg"
              alt="Komerza"
              width={138}
              height={55}
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center gap-4 hidden md:flex">
            <Link
              href="/"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Home className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Home
              </span>
            </Link>
            <Link
              href="/#products"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Package className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Products
              </span>
            </Link>
            <Link
              href="/status"
              className="text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-[#3B82F6]/10 px-2.5 py-1.5 transition-colors duration-300"
            >
              <Activity className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Status
              </span>
            </Link>
            <Link
              href="#"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <HelpCircle className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">
                Support
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <SearchButton />
            <CartButton />
          </div>
          <Link href="/dashboard">
            <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 py-2 rounded-md flex items-center gap-2 text-sm tracking-20-smaller transition-all duration-300 font-normal">
              <LayoutDashboard className="w-[18px] h-[18px]" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-secondary hover:text-[#3B82F6] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-20-smaller">Back to Home</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-green-500/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-green-500/50 relative transform scale-100 sm:scale-107">
                <span className="text-theme-primary">System Status</span>
                <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full">
                  <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl heading-semibold text-theme-primary mb-4">
              Product Status Dashboard
            </h1>
            <p className="text-theme-secondary text-sm sm:text-base max-w-2xl mx-auto">
              Real-time status monitoring for all our products. Check current
              operational status and system health.
            </p>
          </div>

          {/* Status Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-green-500 text-sm font-medium">
                Available ({undetectedCount})
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <RefreshCw className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 text-sm font-medium">
                Updating ({updatingCount})
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-red-500 text-sm font-medium">
                Limited ({riskyCount})
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
            {gameCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#3B82F6] text-white"
                    : "bg-theme-secondary text-theme-secondary hover-theme border border-theme"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products List */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {Object.entries(productStatusesByGame)
              .filter(
                ([game]) => activeCategory === "All" || activeCategory === game
              )
              .map(([game, products]) => (
                <div key={game} className="space-y-4">
                  {/* Game Section Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg sm:text-xl heading-semibold text-[#3B82F6] uppercase tracking-wider">
                      {game}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-[#3B82F6]/50 to-transparent"></div>
                  </div>

                  {/* Products in this game */}
                  <div className="space-y-3">
                    {products.map((product) => {
                      const statusInfo = getStatusInfo(product.status);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <div
                          key={product.id}
                          className="group relative w-full rounded-xl border border-theme bg-theme-secondary p-4 sm:p-6 shadow-theme hover:border-[#3B82F6]/30 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between gap-4">
                            {/* Product Info - Left Side */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-lg sm:text-xl heading-semibold text-theme-primary truncate">
                                  {product.name}
                                </h4>
                                <span className="rounded-md border border-theme bg-theme-secondary px-2 py-1 text-xs shadow-md text-theme-primary flex-shrink-0">
                                  {product.game}
                                </span>
                              </div>

                              {/* Status Details */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-theme-secondary">
                                <div className="flex items-center justify-between sm:justify-start">
                                  <span className="text-theme-tertiary">
                                    Status Since:
                                  </span>
                                  <span className="text-theme-primary ml-2">
                                    {product.undetectedSince}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between sm:justify-start">
                                  <span className="text-theme-tertiary">
                                    Last Updated:
                                  </span>
                                  <span className="text-theme-primary ml-2">
                                    {product.lastUpdated}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between sm:justify-start">
                                  <span className="text-theme-tertiary">
                                    Version:
                                  </span>
                                  <span className="text-theme-primary ml-2">
                                    {product.version}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Status and Actions - Right Side */}
                            <div className="flex items-center gap-4 flex-shrink-0">
                              {/* Status Badge */}
                              <div
                                className={`px-3 py-2 rounded-lg ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center gap-2`}
                              >
                                <StatusIcon
                                  className={`w-4 h-4 ${statusInfo.color} ${
                                    product.status === "updating"
                                      ? "animate-spin"
                                      : ""
                                  }`}
                                />
                                <span
                                  className={`text-sm font-medium ${statusInfo.color} hidden sm:inline`}
                                >
                                  {statusInfo.label}
                                </span>
                              </div>

                              {/* Purchase Button */}
                              <Link
                                href={`/product?slug=${encodeURIComponent(
                                  product.id
                                )}`}
                              >
                                <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 px-4 py-2 rounded-md flex items-center gap-2 text-sm tracking-20-smaller transition-all duration-300 font-normal whitespace-nowrap">
                                  <ShoppingCart className="w-4 h-4" />
                                  <span className="hidden sm:inline">
                                    Purchase Now
                                  </span>
                                  <span className="sm:hidden">Buy</span>
                                </Button>
                              </Link>
                            </div>
                          </div>

                          {/* Mobile Status Info */}
                          <div className="sm:hidden mt-3 pt-3 border-t border-theme">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-theme-tertiary">
                                Status:
                              </span>
                              <div className="flex items-center gap-2">
                                <StatusIcon
                                  className={`w-3 h-3 ${statusInfo.color} ${
                                    product.status === "updating"
                                      ? "animate-spin"
                                      : ""
                                  }`}
                                />
                                <span className={statusInfo.color}>
                                  {statusInfo.description}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>

          {/* Empty State */}
          {Object.entries(productStatusesByGame).filter(
            ([game]) => activeCategory === "All" || activeCategory === game
          ).length === 0 && (
            <div className="text-center py-12">
              <div className="text-theme-secondary text-lg mb-2">
                No products found
              </div>
              <div className="text-theme-tertiary text-sm">
                Try selecting a different category
              </div>
            </div>
          )}

          {/* Last Updated Info */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="rounded-2xl border border-theme bg-theme-secondary p-4 sm:p-6 shadow-theme inline-block">
              <div className="flex items-center gap-2 text-theme-secondary text-sm">
                <RefreshCw className="w-4 h-4" />
                <span>Status page last updated: Just now</span>
              </div>
              <p className="text-xs text-theme-tertiary mt-2">
                This page refreshes automatically every 30 seconds
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-theme bg-theme-primary">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/kimera-logo.svg"
                alt="Komerza"
                width={120}
                height={48}
                className="h-6 sm:h-8 w-auto"
              />
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
  );
}
