"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Package, Download, Search, Eye, FileText, ChevronLeft, ChevronRight } from "lucide-react"

export function OrdersSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5

  const orders = [
    {
      id: "ORD-001",
      product: "Premium Design Template",
      category: "Digital Template",
      orderDate: "2024-01-15",
      amount: "€29.99",
      licenseKey: "TMPL-2024-XXXX-XXXX",
      status: "Active",
      downloads: 3,
    },
    {
      id: "ORD-002",
      product: "E-book Collection",
      category: "Digital Content",
      orderDate: "2024-01-20",
      amount: "€15.99",
      licenseKey: "BOOK-2024-XXXX-XXXX",
      status: "Active",
      downloads: 1,
    },
    {
      id: "ORD-003",
      product: "Software License",
      category: "Software",
      orderDate: "2023-12-01",
      amount: "€49.99",
      licenseKey: "SOFT-2023-XXXX-XXXX",
      status: "Expired",
      downloads: 12,
    },
    {
      id: "ORD-004",
      product: "Mobile App Template",
      category: "Digital Template",
      orderDate: "2023-11-25",
      amount: "€34.99",
      licenseKey: "MOBL-2023-XXXX-XXXX",
      status: "Active",
      downloads: 7,
    },
    {
      id: "ORD-005",
      product: "Video Course Bundle",
      category: "Digital Content",
      orderDate: "2023-11-15",
      amount: "€89.99",
      licenseKey: "VCRS-2023-XXXX-XXXX",
      status: "Active",
      downloads: 2,
    },
    {
      id: "ORD-006",
      product: "Stock Photo Pack",
      category: "Digital Assets",
      orderDate: "2023-11-01",
      amount: "€24.99",
      licenseKey: "STCK-2023-XXXX-XXXX",
      status: "Expired",
      downloads: 15,
    },
    {
      id: "ORD-007",
      product: "WordPress Theme",
      category: "Digital Template",
      orderDate: "2023-10-20",
      amount: "€45.99",
      licenseKey: "WRDP-2023-XXXX-XXXX",
      status: "Active",
      downloads: 3,
    },
    {
      id: "ORD-008",
      product: "Music Pack",
      category: "Digital Content",
      orderDate: "2023-10-10",
      amount: "€19.99",
      licenseKey: "MUSC-2023-XXXX-XXXX",
      status: "Expired",
      downloads: 8,
    },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Reset to page 1 when search changes
  useState(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-500 bg-green-500/10 border-green-500/30"
      case "Expired":
        return "text-red-500 bg-red-500/10 border-red-500/30"
      case "Pending":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30"
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className="pl-10 bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary"
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-theme-secondary text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
        </p>
        {filteredOrders.length > ordersPerPage && (
          <p className="text-theme-secondary text-sm">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {currentOrders.map((order) => (
          <Card key={order.id} className="bg-theme-secondary border-theme hover:border-[#3B82F6]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-theme-primary">{order.product}</h3>
                      <p className="text-theme-secondary text-sm">
                        {order.category} • Order {order.id}
                      </p>
                    </div>
                    <Badge className={`border-0 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-theme-secondary">Order Date</p>
                      <p className="text-theme-primary font-medium">{order.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-theme-secondary">Amount</p>
                      <p className="text-theme-primary font-medium">{order.amount}</p>
                    </div>
                    <div>
                      <p className="text-theme-secondary">License Key</p>
                      <p className="text-theme-primary font-medium font-mono text-xs">{order.licenseKey}</p>
                    </div>
                    <div>
                      <p className="text-theme-secondary">Downloads</p>
                      <p className="text-theme-primary font-medium">{order.downloads}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 min-w-48">
                  {order.status === "Active" ? (
                    <>
                      <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="border-theme text-theme-primary hover:bg-theme-tertiary">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="border-theme text-theme-primary hover:bg-theme-tertiary">
                        <Eye className="w-4 h-4 mr-2" />
                        View Receipt
                      </Button>
                      <Button variant="outline" className="border-theme text-theme-primary hover:bg-theme-tertiary">
                        <FileText className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            variant="outline"
            className="border-theme text-theme-primary hover:bg-theme-tertiary h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => goToPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                className={`h-8 w-8 p-0 text-sm ${
                  currentPage === page
                    ? "bg-[#3B82F6] text-white"
                    : "border-theme text-theme-primary hover:bg-theme-tertiary"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            variant="outline"
            className="border-theme text-theme-primary hover:bg-theme-tertiary h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Empty State */}
      {currentOrders.length === 0 && filteredOrders.length === 0 && (
        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
            <h3 className="text-theme-primary text-lg font-medium mb-2">No orders found</h3>
            <p className="text-theme-secondary mb-6">Try adjusting your search criteria</p>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No results for current page */}
      {currentOrders.length === 0 && filteredOrders.length > 0 && (
        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
            <h3 className="text-theme-primary text-lg font-medium mb-2">No orders on this page</h3>
            <p className="text-theme-secondary mb-6">Try going to a different page or adjusting your search</p>
            <Button
              onClick={() => setCurrentPage(1)}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            >
              Go to First Page
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}