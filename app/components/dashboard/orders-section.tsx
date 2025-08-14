"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Package,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CreditCard,
} from "lucide-react";

// Type definitions from Komerza API
interface LineItem {
  id: string;
  productName: string;
  productId: string;
  variantId: string;
  variantName: string;
  amount: number;
  quantity: number;
  dateCreated: string;
}

interface CustomerDetails {
  id: string;
  countryCode: string;
  emailAddress: string;
  customerId: string;
  dateCreated: string;
}

interface Order {
  id: string;
  dateCreated: string;
  items: LineItem[];
  currencyCode: string;
  gateway: string;
  customer: CustomerDetails;
  status: string;
  amountPaid: number;
  amount: number;
  deliveredItem?: string;
}

interface PaginatedApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T[];
  pages: number;
}

export function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders from Komerza API
  const fetchOrders = async (page: number = 1) => {
    try {
      setLoading(true);
      const response: PaginatedApiResponse<Order> =
        await globalThis.komerza.getOrders(page);

      if (response.success && response.data) {
        setOrders(response.data);
        setTotalPages(response.pages);
      } else {
        console.error("Failed to fetch orders:", response.message);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.items.some(
        (item) =>
          item.productName.toLowerCase().includes(searchLower) ||
          item.variantName.toLowerCase().includes(searchLower)
      ) ||
      order.status.toLowerCase().includes(searchLower)
    );
  });

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "active":
      case "delivered":
        return "text-green-600 bg-green-500/10 border-green-500/20";
      case "pending":
      case "processing":
        return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
      case "failed":
      case "cancelled":
      case "refunded":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-600 bg-gray-500/10 border-gray-500/20";
    }
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  const handleViewOrder = async (orderId: string) => {
    try {
      const response = await globalThis.komerza.getOrder(orderId);
      if (response.success && response.data) {
        setSelectedOrder(response.data);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  if (selectedOrder) {
    return (
      <OrderDetailView
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-[#3B82F6]/10 text-xs flex flex-row items-center gap-2 pl-3 sm:pl-4 pr-6 sm:pr-8 py-1 rounded-full shadow-sm border border-[#3B82F6]/50 relative">
          <span className="text-theme-primary">Order Management</span>
          <div className="absolute grid place-items-center top-1/2 -translate-y-1/2 right-[2px] text-white w-4 h-4 sm:w-5 sm:h-5 bg-[#3B82F6] rounded-full">
            <Package className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary w-4 h-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders by ID, product, or status..."
            className="pl-10 bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary"
            disabled={loading}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-theme-secondary text-xs tracking-20-smaller">
          {loading
            ? "Loading orders..."
            : `Showing ${filteredOrders.length} orders`}
        </p>
        {totalPages > 1 && (
          <p className="text-theme-secondary text-xs tracking-20-smaller">
            Page {currentPage} of {totalPages}
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-theme-secondary text-sm">Loading your orders...</p>
        </div>
      )}

      {/* Orders Grid */}
      {!loading && (
        <div className="grid gap-4 sm:gap-6">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="bg-theme-secondary border-theme hover:border-[#3B82F6]/30 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-medium text-theme-primary">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <Badge
                            className={`border ${getStatusColor(
                              order.status
                            )} text-xs`}
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-theme-secondary text-sm tracking-20-smaller">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""} •{" "}
                          {new Date(order.dateCreated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2 mb-4">
                      {order.items.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-theme-primary rounded-lg"
                        >
                          <div>
                            <p className="text-theme-primary font-medium text-sm">
                              {item.productName}
                            </p>
                            <p className="text-theme-secondary text-xs tracking-20-smaller">
                              {item.variantName} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-theme-primary font-medium text-sm">
                            {formatCurrency(item.amount, order.currencyCode)}
                          </p>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-theme-secondary text-xs text-center py-2">
                          +{order.items.length - 2} more item
                          {order.items.length - 2 !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                          Gateway
                        </p>
                        <p className="text-theme-primary font-medium">
                          {order.gateway}
                        </p>
                      </div>
                      <div>
                        <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                          Total
                        </p>
                        <p className="text-theme-primary font-medium">
                          {formatCurrency(order.amount, order.currencyCode)}
                        </p>
                      </div>
                      <div>
                        <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                          Paid
                        </p>
                        <p className="text-theme-primary font-medium">
                          {formatCurrency(order.amountPaid, order.currencyCode)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 min-w-48">
                    <Button
                      onClick={() => handleViewOrder(order.id)}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 text-sm tracking-20-smaller font-normal"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {order.deliveredItem && (
                      <Button
                        variant="ghost"
                        className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 text-xs tracking-20-smaller font-normal"
                      >
                        <Package className="w-4 h-4 mr-2" />
                        Access Product
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            variant="ghost"
            className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (page > totalPages) return null;
              return (
                <Button
                  key={page}
                  onClick={() => goToPage(page)}
                  variant={currentPage === page ? "default" : "ghost"}
                  className={`h-8 w-8 p-0 text-xs ${
                    currentPage === page
                      ? "bg-[#3B82F6] text-white"
                      : "text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10"
                  }`}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            variant="ghost"
            className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredOrders.length === 0 && orders.length === 0 && (
        <Card className="bg-theme-secondary border-theme">
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-theme-secondary/50 mx-auto mb-4" />
            <h3 className="text-theme-primary text-lg font-medium mb-2 heading-semibold">
              No orders yet
            </h3>
            <p className="text-theme-secondary mb-6 text-sm">
              Start shopping to see your orders appear here
            </p>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 text-sm tracking-20-smaller font-normal">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No search results */}
      {!loading &&
        filteredOrders.length === 0 &&
        orders.length > 0 &&
        searchQuery && (
          <Card className="bg-theme-secondary border-theme">
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 text-theme-secondary/50 mx-auto mb-4" />
              <h3 className="text-theme-primary text-lg font-medium mb-2 heading-semibold">
                No orders found
              </h3>
              <p className="text-theme-secondary mb-6 text-sm">
                No orders match your search for "{searchQuery}"
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                variant="ghost"
                className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 text-xs tracking-20-smaller font-normal"
              >
                Clear search
              </Button>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

// Order Detail View Component
function OrderDetailView({
  order,
  onBack,
}: {
  order: Order;
  onBack: () => void;
}) {
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "active":
      case "delivered":
        return "text-green-600 bg-green-500/10 border-green-500/20";
      case "pending":
      case "processing":
        return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
      case "failed":
      case "cancelled":
      case "refunded":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-600 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 w-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl heading-semibold text-theme-primary">
            Order Details
          </h1>
          <p className="text-theme-secondary text-sm">Order #{order.id}</p>
        </div>
      </div>

      {/* Order Overview */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-theme-primary flex items-center gap-2 text-lg">
              <Package className="w-5 h-5" />
              Order Summary
            </CardTitle>
            <Badge className={`border ${getStatusColor(order.status)}`}>
              {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                Order Date
              </p>
              <p className="text-theme-primary font-medium">
                {new Date(order.dateCreated).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                Payment Method
              </p>
              <p className="text-theme-primary font-medium">{order.gateway}</p>
            </div>
            <div>
              <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                Total Amount
              </p>
              <p className="text-theme-primary font-medium">
                {formatCurrency(order.amount, order.currencyCode)}
              </p>
            </div>
            <div>
              <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                Amount Paid
              </p>
              <p className="text-theme-primary font-medium">
                {formatCurrency(order.amountPaid, order.currencyCode)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary text-lg">
            Items ({order.items.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-theme-primary rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h4 className="text-theme-primary font-medium">
                    {item.productName}
                  </h4>
                  <p className="text-theme-secondary text-sm tracking-20-smaller">
                    {item.variantName} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-theme-primary font-medium">
                  {formatCurrency(item.amount, order.currencyCode)}
                </p>
                <p className="text-theme-secondary text-xs tracking-20-smaller">
                  per item
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card className="bg-theme-secondary border-theme">
        <CardHeader>
          <CardTitle className="text-theme-primary text-lg">
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                Email Address
              </p>
              <p className="text-theme-primary font-medium">
                {order.customer.emailAddress}
              </p>
            </div>
            <div>
              <p className="text-theme-secondary text-xs tracking-20-smaller uppercase">
                Country
              </p>
              <p className="text-theme-primary font-medium">
                {order.customer.countryCode}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivered Item */}
      {order.deliveredItem && (
        <Card className="bg-theme-secondary border-theme">
          <CardHeader>
            <CardTitle className="text-theme-primary text-lg">
              Digital Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <div>
                <p className="text-green-600 font-medium">Product Delivered</p>
                <p className="text-theme-secondary text-sm">
                  Your digital product is ready for access
                </p>
              </div>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 text-sm tracking-20-smaller font-normal">
                <Package className="w-4 h-4 mr-2" />
                Access Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}