"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  DollarSign,
  Receipt,
  ArrowUpRight,
  CheckCircle,
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

interface DashboardOverviewProps {
  onSectionChange?: (section: string) => void;
}

export function DashboardOverview({ onSectionChange }: DashboardOverviewProps) {
  const [storeName, setStoreName] = useState("Store");
  const [customer, setCustomer] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Fetch store info
        const storeRes = await globalThis.komerza.getStore();
        if (storeRes.success && storeRes.data) {
          setStoreName(storeRes.data.name);
        }

        // Fetch customer data
        const customerRes = await globalThis.komerza.getCustomer();
        if (customerRes.success && customerRes.data) {
          setCustomer(customerRes.data);
        }

        // Fetch recent orders
        const ordersRes: PaginatedApiResponse<Order> =
          await globalThis.komerza.getOrders(1);
        if (ordersRes.success && ordersRes.data) {
          setOrders(ordersRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Use real customer data or fallbacks
  const customerEmail = customer?.emailAddress || "Loading...";
  const accountBalance = customer?.balance
    ? `€${customer.balance.toFixed(2)}`
    : "€0.00";
  const totalOrders = orders.length || 0;
  const activeProducts =
    orders.filter(
      (order) =>
        order.status.toLowerCase() === "active" ||
        order.status.toLowerCase() === "completed" ||
        order.status.toLowerCase() === "delivered"
    ).length || 0;

  // Format currency based on order's currency code
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  // Get status colors consistent with orders section
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "active":
      case "delivered":
        return {
          color: "text-green-600",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
        };
      case "pending":
      case "processing":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
        };
      case "failed":
      case "cancelled":
      case "refunded":
        return {
          color: "text-red-600",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-500/10",
          border: "border-gray-500/20",
        };
    }
  };

  // Get recent orders from real API data
  const recentOrders = orders.slice(0, 3).map((order) => {
    const statusStyles = getStatusColor(order.status);
    const mainItem = order.items[0]; // Get the first item as the main product

    return {
      id: order.id,
      fullOrder: order, // Keep reference to full order data
      product: mainItem?.productName || "Unknown Product",
      category: mainItem?.variantName || "Digital Product",
      amount: formatCurrency(order.amount, order.currencyCode),
      date: order.dateCreated,
      status: order.status,
      statusColor: statusStyles.color,
      statusBg: statusStyles.bg,
      statusBorder: statusStyles.border,
      itemCount: order.items.length,
    };
  });

  // Handle viewing individual order
  const handleViewOrder = async (orderId: string) => {
    // Navigate to orders section and set the specific order to view
    onSectionChange?.("orders");
    // We'll need to communicate which order to show
    // For now, just navigate to orders section
  };
  const quickStats = [
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      icon: Package,
      color: "text-[#3B82F6]",
      bgColor: "bg-[#3B82F6]/10",
    },
    {
      label: "Active Products",
      value: activeProducts.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Account Balance",
      value: accountBalance,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-theme-secondary border-theme">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-theme-secondary text-xs font-medium tracking-20-smaller uppercase">
                      {stat.label}
                    </p>
                    {loading ? (
                      <div className="h-8 w-16 bg-theme-tertiary animate-pulse rounded mt-1"></div>
                    ) : (
                      <p className="text-theme-primary text-2xl font-semibold">
                        {stat.value}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl heading-semibold text-theme-primary mb-1">
            Your Recent Orders
          </h2>
          <p className="text-xs text-theme-secondary">
            Track and manage your latest purchases
          </p>
        </div>

        <Card className="bg-theme-secondary border-theme">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-theme-primary flex items-center gap-2 text-lg">
                <Receipt className="w-5 h-5" />
                Order History
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => onSectionChange?.("orders")}
                className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 text-xs tracking-20-smaller font-normal transition-colors"
              >
                View All Orders
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-theme-secondary text-sm">
                  Loading orders...
                </p>
              </div>
            ) : recentOrders.length > 0 ? (
              recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-theme-primary rounded-lg border border-theme hover:border-[#3B82F6]/30 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h4 className="text-theme-primary font-medium text-sm">
                        {order.product}
                      </h4>
                      <p className="text-theme-secondary text-xs tracking-20-smaller">
                        {order.category}
                        {order.itemCount > 1 &&
                          ` +${order.itemCount - 1} more`}{" "}
                        • {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-theme-primary font-medium text-sm">
                        {order.amount}
                      </p>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${order.statusBg} ${order.statusColor} ${order.statusBorder}`}
                      >
                        {order.status}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOrder(order.id)}
                      className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 h-6 w-6 p-0"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-theme-secondary/50 mx-auto mb-4" />
                <p className="text-theme-secondary text-sm">No orders yet</p>
                <p className="text-theme-secondary/60 text-xs">
                  Start shopping to see your orders here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}