"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Download, CreditCard, Calendar, DollarSign, Receipt } from "lucide-react"

export function DashboardOverview() {
  const [storeName, setStoreName] = useState("Store")
  const customerEmail = "john.doe@example.com"
  useEffect(() => {
    ;(async () => {
      const res = await globalThis.komerza.getStore()
      if (res.success && res.data) setStoreName(res.data.name)
    })()
  }, [])
  const accountBalance = "€47.50"

  const recentOrders = [
    {
      id: "ORD-001",
      product: "Premium Design Template",
      category: "Digital Template",
      amount: "€29.99",
      date: "2024-01-28",
      status: "Active",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
    },
    {
      id: "ORD-002",
      product: "E-book Collection",
      category: "Digital Content", 
      amount: "€15.99",
      date: "2024-01-25",
      status: "Active",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
    },
    {
      id: "ORD-003",
      product: "Software License",
      category: "Software",
      amount: "€49.99",
      date: "2024-01-20",
      status: "Expired",
      statusColor: "text-red-500",
      statusBg: "bg-red-500/10",
    },
    {
      id: "ORD-004",
      product: "Graphics Pack",
      category: "Digital Assets",
      amount: "€19.99",
      date: "2024-01-15",
      status: "Active",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section and Balance - One Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Welcome Banner */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#3B82F6]/20 to-[#1d4ed8]/20 border border-[#3B82F6]/30 rounded-2xl p-6">
          <div className="flex items-center justify-between h-full">
            <div>
              <h2 className="text-2xl font-bold text-theme-primary mb-2">Welcome to {storeName}! 👋</h2>
              <p className="text-theme-secondary">{customerEmail}</p>
              <p className="text-theme-secondary text-sm mt-1">Manage your digital products and orders</p>
            </div>
            <div className="hidden md:block">
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller transition-all duration-300 font-normal">
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </div>
          </div>
        </div>

        {/* Balance Display */}
        <Card className="bg-theme-secondary border-theme">
          <CardHeader>
            <CardTitle className="text-theme-primary flex items-center gap-2 text-lg">
              <DollarSign className="w-5 h-5" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3B82F6] mb-2">{accountBalance}</div>
              <p className="text-theme-secondary text-sm">Available funds</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders - Full Width */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-theme-primary flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Recent Orders
            </CardTitle>
            <Button variant="outline" className="border-theme text-theme-primary hover:bg-theme-tertiary h-8 text-sm tracking-20-smaller font-normal">
              View All Orders
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentOrders.slice(0, 4).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-theme-primary rounded-lg border border-theme"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <div>
                  <h4 className="text-theme-primary font-medium">{order.product}</h4>
                  <p className="text-theme-secondary text-sm">
                    {order.category} • {order.date}
                  </p>
                </div>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-theme-primary font-medium">{order.amount}</p>
                  <Badge className={`${order.statusColor} ${order.statusBg} border-0 text-xs`}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}