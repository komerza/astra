"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, Package, HelpCircle, LayoutDashboard, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CartButton } from "./cart-button"
import { SearchButton } from "./search-button"
import { MobileNav } from "./mobile-nav"
import { ThemeToggle } from "./theme-toggle"

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-8">
          <Image src="/kimera-logo.svg" alt="Komerza" width={138} height={55} className="h-8 sm:h-9 w-auto" />

          {/* Desktop Navigation */}
          <div className="items-center gap-4 hidden md:flex">
            <Link
              href="#"
              className="text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-[#3B82F6]/10 px-2.5 py-1.5 transition-colors duration-300"
            >
              <Home className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Home</span>
            </Link>
            <Link
              href="/products"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Package className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Products</span>
            </Link>
            <Link
              href="/status"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Activity className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Status</span>
            </Link>
            <Link
              href="#"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <HelpCircle className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Support</span>
            </Link>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <SearchButton />
          <CartButton />
          <Link href="/dashboard">
            <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 py-2 rounded-md flex items-center gap-2 text-sm tracking-20-smaller transition-all duration-300 font-normal">
              <LayoutDashboard className="w-[18px] h-[18px]" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </header>
  )
}