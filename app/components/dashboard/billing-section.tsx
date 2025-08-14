"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Calendar,
  Download,
  Receipt,
  Plus,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"

export function BillingSection() {
  const [activeTab, setActiveTab] = useState("overview")

  const subscriptions = [
    {
      id: "sub_1",
      product: "Crusader",
      plan: "Premium License",
      status: "Active",
      nextBilling: "2024-03-15",
      amount: "€14.99",
      interval: "monthly",
      daysLeft: 45,
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
    },
    {
      id: "sub_2",
      product: "Onyx Full",
      plan: "Ultimate License",
      status: "Expiring Soon",
      nextBilling: "2024-02-20",
      amount: "€15.99",
      interval: "monthly",
      daysLeft: 23,
      statusColor: "text-yellow-500",
      statusBg: "bg-yellow-500/10",
    },
    {
      id: "sub_3",
      product: "Apex Lite",
      plan: "Pro Pack",
      status: "Active",
      nextBilling: "2024-05-01",
      amount: "€8.99",
      interval: "monthly",
      daysLeft: 67,
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
    },
  ]

  const paymentMethods = [
    {
      id: "pm_1",
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "card",
      brand: "mastercard",
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2026",
      isDefault: false,
    },
  ]

  const invoices = [
    {
      id: "inv_001",
      date: "2024-01-28",
      amount: "€14.99",
      product: "Crusader Premium",
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "inv_002",
      date: "2024-01-25",
      amount: "€15.99",
      product: "Onyx Full Ultimate",
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "inv_003",
      date: "2024-01-20",
      amount: "€8.99",
      product: "Apex Lite Pro",
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "inv_004",
      date: "2024-01-15",
      amount: "€14.99",
      product: "Crusader Premium",
      status: "Paid",
      downloadUrl: "#",
    },
  ]

  const billingStats = {
    totalSpent: "€54.96",
    activeSubscriptions: 3,
    nextPayment: "€14.99",
    nextPaymentDate: "Feb 20, 2024",
  }

  return (
    <div className="space-y-6">
      {/* Billing Header */}
      <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#1d4ed8]/20 border border-[#3B82F6]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Billing & Subscriptions</h2>
            <p className="text-[#cccccc]">Manage your payments and subscription plans</p>
          </div>
          <div className="hidden md:block">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>
      </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#808080] text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">{billingStats.totalSpent}</p>
              </div>
              <div className="bg-[#3B82F6]/20 text-[#3B82F6] p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#808080] text-sm">Active Plans</p>
                <p className="text-2xl font-bold text-white">{billingStats.activeSubscriptions}</p>
              </div>
              <div className="bg-green-500/20 text-green-500 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#808080] text-sm">Next Payment</p>
                <p className="text-2xl font-bold text-white">{billingStats.nextPayment}</p>
              </div>
              <div className="bg-yellow-500/20 text-yellow-500 p-3 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#808080] text-sm">Due Date</p>
                <p className="text-lg font-bold text-white">{billingStats.nextPaymentDate}</p>
              </div>
              <div className="bg-red-500/20 text-red-500 p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing Tabs */}
      <div className="flex space-x-1 bg-white/5 p-1 rounded-lg">
        {[
          { id: "overview", label: "Subscriptions", icon: Calendar },
          { id: "payment", label: "Payment Methods", icon: CreditCard },
          { id: "invoices", label: "Invoices", icon: Receipt },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? "bg-[#3B82F6] text-white" : "text-[#cccccc] hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {subscriptions.map((subscription) => (
            <Card
              key={subscription.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{subscription.product}</h3>
                        <p className="text-[#808080] text-sm">{subscription.plan}</p>
                      </div>
                      <Badge className={`${subscription.statusColor} ${subscription.statusBg} border-0`}>
                        {subscription.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-[#808080]">Amount</p>
                        <p className="text-white font-medium">{subscription.amount}</p>
                      </div>
                      <div>
                        <p className="text-[#808080]">Billing</p>
                        <p className="text-white font-medium">{subscription.interval}</p>
                      </div>
                      <div>
                        <p className="text-[#808080]">Next Payment</p>
                        <p className="text-white font-medium">{subscription.nextBilling}</p>
                      </div>
                      <div>
                        <p className="text-[#808080]">Days Left</p>
                        <p className="text-white font-medium">{subscription.daysLeft} days</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 min-w-48">
                    <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                      Renew Now
                    </Button>
                    <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                      Manage Plan
                    </Button>

                    {subscription.daysLeft < 30 && (
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500 text-sm">Expires soon!</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "payment" && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase">{method.brand}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">•••• •••• •••• {method.last4}</h4>
                      <p className="text-[#808080] text-sm">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                    {method.isDefault && <Badge className="bg-[#3B82F6]/20 text-[#3B82F6] border-0">Default</Badge>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                      Edit
                    </Button>
                    <Button className="bg-transparent hover:bg-white/10 text-[#808080] h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "invoices" && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Invoice History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{invoice.product}</h4>
                      <p className="text-[#808080] text-sm">
                        {invoice.date} • {invoice.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white font-medium">{invoice.amount}</p>
                      <Badge className="text-green-500 bg-green-500/10 border-0 text-xs">{invoice.status}</Badge>
                    </div>
                    <Button className="bg-transparent hover:bg-white/10 text-[#3B82F6] h-8 w-8 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
