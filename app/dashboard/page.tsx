"use client"

import { useState, useEffect } from "react"
import { DashboardOverview } from "@/app/components/dashboard/dashboard-overview"
import { OrdersSection } from "@/app/components/dashboard/orders-section"
import { AffiliatesSection } from "@/app/components/dashboard/affiliates-section"
import { SupportSection } from "@/app/components/dashboard/support-section"
import { SettingsSection } from "@/app/components/dashboard/settings-section"
import dynamic from "next/dynamic"

// Dynamically import DashboardLayout with ssr: false to prevent server-side rendering during build
const DashboardLayout = dynamic(() => import("@/app/components/dashboard/dashboard-layout"), { ssr: false });

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "orders":
        return <OrdersSection />
      case "affiliates":
        return <AffiliatesSection />
      case "support":
        return <SupportSection />
      case "settings":
        return <SettingsSection />
      default:
        return <DashboardOverview />
    }
  }

  if (!isClient) {
    return (
      <div className="bg-theme-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-theme-primary min-h-screen">
      <DashboardLayout activeSection={activeSection} onSectionChange={setActiveSection}>
        {renderSection()}
      </DashboardLayout>
    </div>
  )
}
