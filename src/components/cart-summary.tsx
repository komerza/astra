"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Tag } from "lucide-react";
import { parseCartItem } from "@/lib/cart-utils";

interface ProductInfo {
  id: string;
  name: string;
  variants: Array<{ id: string; name: string; cost: number }>;
}

interface CartSummaryProps {
  items: any[];
  productsInfo: Record<string, ProductInfo>;
  couponCode: string;
  setCouponCode: (code: string) => void;
  onCheckout: () => void;
  clearCart: () => void;
}

export function CartSummary({
  items,
  productsInfo,
  couponCode,
  setCouponCode,
  onCheckout,
  clearCart,
}: CartSummaryProps) {
  const total = items
    .reduce((sum, item) => {
      const { productId, variantId, quantity } = parseCartItem(item);
      const productInfo = productsInfo[productId];
      const variantInfo = productInfo?.variants.find((v) => v.id === variantId);
      const price = variantInfo?.cost || 0;
      return sum + price * Number(quantity);
    }, 0)
    .toFixed(2);

  return (
    <div className="p-6 border-t border-theme space-y-4">
      <div className="flex justify-between items-center py-2 border-b border-theme">
        <span className="text-theme-primary font-medium">Total</span>
        <span className="text-theme-primary font-bold text-lg">€{total}</span>
      </div>
      <div className="space-y-2">
        <label className="text-theme-primary text-sm font-medium">
          Coupon Code
        </label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary w-4 h-4" />
          <Input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="pl-10 bg-theme-secondary border-theme text-theme-primary placeholder:text-theme-secondary h-10 rounded-md focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]/50"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onCheckout}
          className="flex-1 bg-[#3B82F6] text-white hover:bg-[#2563EB] h-10 px-4 rounded-md flex items-center justify-center gap-2 text-sm transition-all duration-300"
        >
          <CreditCard className="w-4 h-4" />
          Checkout
        </Button>
        <Button
          onClick={clearCart}
          className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-10 px-4 rounded-md text-sm transition-all duration-300"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
