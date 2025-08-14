"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, UserPlus, Menu } from "lucide-react"
import { useCart } from "../context/cart-context"
import { CartDropdown } from "./cart-dropdown"
import { MobileNav } from "./mobile-nav"

export function StickyNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { items } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 z-50 w-full duration-500 transition-all ${
          isScrolled ? "header-blur bg-white/[0.01] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="page-container flex h-[70px] w-full items-center justify-between px-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex flex-row items-center gap-2">
                <Image
                  alt="website logo"
                  width={32}
                  height={32}
                  className="animate-eye-flip-vertical h-8 w-8 rounded-md"
                  src="/kimera-logo.svg"
                />
                <div className="monument-bold relative flex flex-row items-end font-semibold tracking-[0.02em]">
                  <span className="text-white">visuals</span>
                  <span className="text-[#3B82F6]">.gg</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden flex-row items-center sm:flex">
              <Link href="/products">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Products
                </button>
              </Link>
              <Link href="https://discord.visuals.gg/" target="_blank">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Discord
                </button>
              </Link>
              <Link href="/payment-methods">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Payment Methods
                </button>
              </Link>
              <Link href="/status">
                <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]">
                  Status
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex flex-row items-center gap-4">
            {/* Cart Button */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-8 w-8 rounded-md px-2 relative"
              >
                <ShoppingCart size={18} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#3B82F6] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>

            {/* Dashboard Button - Desktop */}
            <Link href="/dashboard" className="hidden sm:block">
              <button className="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#3B82F6] text-primary-foreground dark:text-accent-foreground shadow hover:bg-[#3B82F6]/90 h-8 rounded-md px-3 text-xs">
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
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}
