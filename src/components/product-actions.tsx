"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Plus,
  Minus,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { CheckoutModal } from "./checkout-modal";
import { toast } from "sonner";
import { useFormatter } from "@/lib/formatter";

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  stockMode: number; // 0 = Calculated, 1 = Ignored, 2 = Fixed
}

interface Product {
  id: string;
  name: string;
  game: string;
  basePrice: number;
  variants: ProductVariant[];
  image: string;
}

interface ProductActionsProps {
  product: Product;
  onPriceChange: (price: number) => void;
}

export function ProductActions({
  product,
  onPriceChange,
}: ProductActionsProps) {
  const { formatPrice } = useFormatter();
  // Ensure variants exist and are valid
  const variants =
    product.variants && product.variants.length > 0 ? product.variants : [];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { dispatch, addItem } = useCart();

  // Stock calculation helpers
  const getStockDisplay = (variant: ProductVariant) => {
    switch (variant.stockMode) {
      case 0: // Calculated
        return variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock";
      case 1: // Ignored
        return "Always available"; // Show this instead of null
      case 2: // Fixed
        return variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock";
      default:
        return "Always available";
    }
  };

  const isVariantInStock = (variant: ProductVariant) => {
    switch (variant.stockMode) {
      case 0: // Calculated
      case 2: // Fixed
        return variant.stock > 0;
      case 1: // Ignored
        return true; // Always available if stock is ignored
      default:
        return true;
    }
  };

  const getMaxQuantity = (variant: ProductVariant) => {
    switch (variant.stockMode) {
      case 0: // Calculated
      case 2: // Fixed
        return variant.stock;
      case 1: // Ignored
        return 999; // No limit if stock is ignored
      default:
        return 999;
    }
  };

  const getStockStatusColor = (variant: ProductVariant) => {
    if (variant.stockMode === 1) return "bg-gray-400"; // Gray for ignored stock

    const stock = variant.stock;
    if (stock === 0) return "bg-red-500";
    if (stock <= 5) return "bg-orange-500";
    return "bg-green-500";
  };

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    // Reset quantity if it exceeds new variant's stock
    const maxQty = getMaxQuantity(variant);
    const newQuantity = Math.min(quantity, maxQty);
    setQuantity(newQuantity);
    onPriceChange(variant.price * newQuantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const maxQty = getMaxQuantity(selectedVariant);
    const clampedQuantity = Math.max(1, Math.min(newQuantity, maxQty));
    setQuantity(clampedQuantity);
    onPriceChange(selectedVariant.price * clampedQuantity);
  };

  const handleAddToCart = () => {
    if (!isVariantInStock(selectedVariant)) {
      toast.error("Out of Stock", {
        description: "This variant is currently out of stock",
      });
      return;
    }

    addItem(product.id, selectedVariant.id, quantity);

    dispatch({ type: "OPEN_CART" });
  };

  const handleBuyNow = async () => {
    if (!isVariantInStock(selectedVariant)) {
      toast.error("Out of Stock", {
        description: "This variant is currently out of stock",
      });
      return;
    }

    addItem(product.id, selectedVariant.id, quantity);
    setShowCheckoutModal(true);
  };

  const currentMaxQuantity = getMaxQuantity(selectedVariant);
  const isOutOfStock = !isVariantInStock(selectedVariant);

  return (
    <>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[#808080] text-sm font-medium tracking-20-smaller">
              Choose variant
            </h3>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#808080] tracking-20-smaller">
                Qty:
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() =>
                    handleQuantityChange(Math.max(1, quantity - 1))
                  }
                  disabled={isOutOfStock || quantity <= 1}
                  className="bg-transparent border border-white/20 text-gray-900 dark:text-white hover:bg-white/10 font-semibold h-8 w-8 p-0 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="flex items-center justify-center w-8 h-8 text-gray-900 dark:text-white font-medium text-sm">
                  {quantity}
                </div>

                <Button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={isOutOfStock || quantity >= currentMaxQuantity}
                  className="bg-transparent border border-white/20 text-gray-900 dark:text-white hover:bg-white/10 font-semibold h-8 w-8 p-0 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {variants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => handleVariantChange(variant)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                  selectedVariant.id === variant.id
                    ? "border-[#3B82F6] bg-[#3B82F6]/10"
                    : isVariantInStock(variant)
                    ? "border-white/10 bg-white/5 hover:border-white/20"
                    : "border-red-200 bg-red-50 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-900 dark:text-white heading-semibold">
                      {variant.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${getStockStatusColor(
                          variant
                        )}`}
                      ></div>
                      <p className="text-[#808080] text-sm">
                        {getStockDisplay(variant)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#3B82F6] font-bold text-lg">
                      {formatPrice(variant.price)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className={`flex-[0.7] h-8 px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm tracking-20-smaller transition-all duration-300 whitespace-nowrap ${
              isOutOfStock
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#3B82F6] text-white hover:bg-[#2563EB]"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{isOutOfStock ? "Out of Stock" : "Buy Now"}</span>
          </Button>

          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex-[0.3] h-8 px-4 py-2 rounded-md border border-[rgba(255,255,255,0.2)] shadow-lg flex items-center justify-center gap-2 text-sm tracking-20-smaller transition-all duration-300 whitespace-nowrap ${
              isOutOfStock
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-[#050505] hover:bg-[#1a1a1a] text-white"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </span>
          </Button>
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        couponCode=""
      />
    </>
  );
}
