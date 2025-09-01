"use client"

import { Home, Package, HelpCircle, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-theme-primary border-b border-theme shadow-2xl z-50 md:hidden animate-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto px-6 py-6">
              <nav className="space-y-4">
                <Link
                  to="/"
                  onClick={onClose}
                  className="text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-3 rounded-md bg-[#3B82F6]/10 px-4 py-3 transition-colors duration-300 mobile-touch-target"
                >
                  <Home className="w-5 h-5" />
                  <span className="text-base font-normal tracking-20-smaller">
                    Home
                  </span>
                </Link>
                <Link
                  to="/products"
                  onClick={onClose}
                  className="text-theme-secondary hover:text-[#3B82F6] hover:bg-gray-100 dark:hover:bg-white/15 flex items-center gap-3 rounded-md bg-transparent px-4 py-3 transition-colors duration-300 mobile-touch-target"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-base font-normal tracking-20-smaller">
                    Products
                  </span>
                </Link>
                <Link
                  to="/dashboard/support"
                  onClick={onClose}
                  className="text-theme-secondary hover:text-[#3B82F6] hover:bg-gray-100 dark:hover:bg-white/15 flex items-center gap-3 rounded-md bg-transparent px-4 py-3 transition-colors duration-300 mobile-touch-target"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-base font-normal tracking-20-smaller">
                    Support
                  </span>
                </Link>
                <div className="pt-4 border-t border-theme">
                  <Link to="/dashboard" onClick={onClose}>
                    <Button className="w-full bg-[#3B82F6] text-white hover:bg-[#2563EB] h-12 px-4 py-3 rounded-md flex items-center justify-center gap-3 text-base tracking-20-smaller transition-all duration-300 font-normal mobile-touch-target">
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Client Area</span>
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}
