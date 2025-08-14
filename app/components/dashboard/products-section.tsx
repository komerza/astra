"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Download, AlertTriangle, Search, Filter, RefreshCw, Copy, Settings } from "lucide-react"

export function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const products = [
    {
      id: "crusader",
      name: "Crusader",
      game: "Rainbow Six Siege",
      status: "Active",
      version: "v2.4.1",
      licenseKey: "CRSD-2024-XXXX-XXXX",
      purchaseDate: "2024-01-15",
      expiryDate: "2024-03-15",
      daysLeft: 45,
      downloads: 12,
      lastDownload: "2 hours ago",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
      features: ["Aimbot", "ESP", "Radar", "No Recoil"],
      price: "€14.99",
    },
    {
      id: "onyx-full",
      name: "Onyx Full (Unlock All)",
      game: "Rainbow Six Siege",
      status: "Active",
      version: "v3.1.0",
      licenseKey: "ONYX-2024-XXXX-XXXX",
      purchaseDate: "2024-01-20",
      expiryDate: "2024-02-20",
      daysLeft: 23,
      downloads: 8,
      lastDownload: "1 day ago",
      statusColor: "text-green-500",
      statusBg: "bg-green-500/10",
      features: ["Unlock All", "Instant Access", "Premium Skins"],
      price: "€15.99",
    },
    {
      id: "apex-lite",
      name: "Apex Lite",
      game: "Apex Legends",
      status: "Updating",
      version: "v1.5.2",
      licenseKey: "APEX-2024-XXXX-XXXX",
      purchaseDate: "2024-02-01",
      expiryDate: "2024-05-01",
      daysLeft: 67,
      downloads: 5,
      lastDownload: "3 days ago",
      statusColor: "text-yellow-500",
      statusBg: "bg-yellow-500/10",
      features: ["Aimbot", "ESP", "Triggerbot"],
      price: "€8.99",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.game.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || product.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="space-y-6">
      {/* Products Header */}
      <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#1d4ed8]/20 border border-[#3B82F6]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">My Products</h2>
            <p className="text-[#cccccc]">Manage your active subscriptions and downloads</p>
          </div>
          <div className="hidden md:block">
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
              <Package className="w-4 h-4 mr-2" />
              Browse Store
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808080] w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-[#808080]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="updating">Updating</option>
            <option value="expired">Expired</option>
          </select>
          <Button className="bg-white/5 border border-white/10 text-white hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                      <p className="text-[#808080] text-sm">{product.game}</p>
                    </div>
                    <Badge className={`${product.statusColor} ${product.statusBg} border-0`}>{product.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-[#808080]">Version</p>
                      <p className="text-white font-medium">{product.version}</p>
                    </div>
                    <div>
                      <p className="text-[#808080]">Expires</p>
                      <p className="text-white font-medium">{product.daysLeft} days</p>
                    </div>
                    <div>
                      <p className="text-[#808080]">Downloads</p>
                      <p className="text-white font-medium">{product.downloads}</p>
                    </div>
                    <div>
                      <p className="text-[#808080]">Last Download</p>
                      <p className="text-white font-medium">{product.lastDownload}</p>
                    </div>
                  </div>

                  {/* License Key */}
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#808080] text-xs">License Key</p>
                        <p className="text-white font-mono text-sm">{product.licenseKey}</p>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(product.licenseKey)}
                        className="bg-transparent hover:bg-white/10 text-[#3B82F6] h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-4">
                    <p className="text-[#808080] text-sm mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature, index) => (
                        <Badge key={index} className="bg-[#3B82F6]/20 text-[#3B82F6] border-0 text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 min-w-48">
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                    <Download className="w-4 h-4 mr-2" />
                    Download Latest
                  </Button>
                  <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check Updates
                  </Button>
                  <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage
                  </Button>

                  {/* Expiry Warning */}
                  {product.daysLeft < 30 && (
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-yellow-500 text-sm">Expires in {product.daysLeft} days</span>
                      </div>
                      <Button className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-black h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                        Renew Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-[#808080] mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No products found</h3>
            <p className="text-[#808080] mb-6">Try adjusting your search or filter criteria</p>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
