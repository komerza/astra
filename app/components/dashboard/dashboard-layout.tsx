"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Home, Package, MessageCircle, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { 
    id: "overview", 
    label: "Home", 
    description: "Overview of your account, orders, and balance",
    icon: Home 
  },
  { 
    id: "orders", 
    label: "Orders", 
    description: "View and manage your purchase history",
    icon: Package 
  },
  { 
    id: "affiliates", 
    label: "Affiliates", 
    description: "Manage your affiliate program and earnings",
    icon: Users 
  },
  { 
    id: "support", 
    label: "Support", 
    description: "Get help and manage support tickets",
    icon: MessageCircle 
  },
  { 
    id: "settings", 
    label: "Settings", 
    description: "Account settings and data management",
    icon: Settings 
  },
]

export default function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const activeItem = navigationItems.find(item => item.id === activeSection)

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Top Header */}
      <header className="bg-theme-secondary border-b border-theme">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Single row with logo, navigation, and back button */}
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/kimera-logo.svg" alt="Komerza" width={120} height={48} className="h-6 sm:h-8 w-auto" />
            </Link>

            {/* Navigation in center */}
            <nav className="flex-1 flex justify-center overflow-x-auto scrollbar-none px-4">
              <div className="flex space-x-1 min-w-max md:min-w-0">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSectionChange(item.id)}
                      className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-[#3B82F6] text-white"
                          : "text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden xs:inline sm:inline">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </nav>

            <Link href="/">
              <Button className="bg-transparent hover:bg-gray-100 dark:hover:bg-white/15 text-theme-primary h-8 px-4 py-2 text-sm tracking-20-smaller transition-all duration-300 font-normal">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-theme-primary mb-2">
            {activeItem?.label}
          </h1>
          <p className="text-theme-secondary text-sm sm:text-base">
            {activeItem?.description}
          </p>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  )
}