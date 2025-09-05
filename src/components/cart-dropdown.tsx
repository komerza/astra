"use client"

import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Tag, X, Plus, Minus } from "lucide-react";
import { CheckoutModal } from "./checkout-modal";
import { useFormatter } from "@/lib/formatter";

interface ProductInfo {
  id: string;
  name: string;
  variants: Array<{
    id: string;
    name: string;
    cost: number;
  }>;
}

export function CartDropdown() {
  const { state, dispatch, clearCart, removeItem, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [productsInfo, setProductsInfo] = useState<Record<string, ProductInfo>>(
    {}
  );
  const { formatPrice } = useFormatter();

  // Fetch product info when cart opens
  useEffect(() => {
    if (!state.isOpen || state.items.length === 0) return;

    const fetchProductsInfo = async () => {
      try {
        const api = (globalThis as any).komerza;
        const store = await api?.getStore?.();
        if (store?.success && store.data?.products) {
          const productMap: Record<string, ProductInfo> = {};
          store.data.products.forEach((product: any) => {
            productMap[product.id] = {
              id: product.id,
              name: product.name,
              variants: product.variants || [],
            };
          });
          setProductsInfo(productMap);
        }
      } catch (error) {
        console.warn("Failed to fetch product info:", error);
      }
    };

    fetchProductsInfo();
  }, [state.isOpen, state.items.length]);

  // Helper to normalize cart item data
  const normalizeItem = (item: any) => {
    const productId = item.productId?.productId || item.productId;
    const variantId = item.variantId || item.productId?.variantId || "";
    const quantity = item.quantity || item.productId?.quantity || 1;
    return {
      productId: String(productId),
      variantId: String(variantId),
      quantity: Number(quantity),
    };
  };

  // Helper to calculate item price
  const getItemPrice = (productId: string, variantId: string) => {
    const product = productsInfo[productId];
    const variant = product?.variants.find((v) => v.id === variantId);
    return variant?.cost || 0;
  };

  // Calculate total
  const total = state.items.reduce((sum, item) => {
    const { productId, variantId, quantity } = normalizeItem(item);
    return sum + getItemPrice(productId, variantId) * quantity;
  }, 0);

  const handleCheckout = () => {
    if (state.items.length > 0) setShowCheckoutModal(true);
  };

  if (!state.isOpen) return null;

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => dispatch({ type: "CLOSE_CART" })}
        />

        <div className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-theme-primary border-l border-theme shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right">
          <div className="flex items-center justify-between p-6 border-b border-theme">
            <h2 className="text-theme-primary text-lg heading-semibold">
              Shopping Cart{" "}
              <span className="text-theme-secondary text-sm font-normal">
                ({itemCount} Items)
              </span>
            </h2>
            <Button
              onClick={() => dispatch({ type: "CLOSE_CART" })}
              className="bg-transparent hover:bg-theme-secondary text-theme-primary h-8 w-8 p-0 rounded-md transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 mt-6 space-y-3">
            {state.items.length === 0 && (
              <p className="text-theme-secondary text-sm">
                Your cart is empty.
              </p>
            )}
            {state.items.map((item, idx) => {
              const { productId, variantId, quantity } = normalizeItem(item);
              const product = productsInfo[productId];
              const variant = product?.variants.find((v) => v.id === variantId);

              const name = product?.name || `Product ${productId}`;
              const variantName =
                variant?.name ||
                (variantId ? `Variant ${variantId}` : "Standard");
              const price = variant?.cost || 0;
              const itemTotal = price * quantity;

              return (
                <div
                  key={`${productId}-${variantId}-${idx}`}
                  className="p-4 border border-theme rounded-lg bg-theme-secondary space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-theme-primary text-sm font-medium">
                        {name}
                      </h4>
                      <p className="text-theme-secondary text-xs">
                        {variantName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-theme-primary text-sm font-medium">
                        {formatPrice(price)}
                      </p>
                      {quantity > 1 && (
                        <p className="text-theme-secondary text-xs">
                          {formatPrice(itemTotal)} total
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-theme-secondary text-xs">
                        Quantity:
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={() =>
                            quantity > 1 &&
                            updateQuantity(productId, variantId, quantity - 1)
                          }
                          disabled={quantity <= 1}
                          className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-6 w-6 p-0 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-theme-primary text-sm font-medium min-w-[20px] text-center">
                          {quantity}
                        </span>
                        <Button
                          onClick={() =>
                            updateQuantity(productId, variantId, quantity + 1)
                          }
                          className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-6 w-6 p-0 rounded flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeItem(productId, variantId)}
                      className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-7 px-2 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {state.items.length > 0 && (
            <div className="p-6 border-t border-theme space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-theme">
                <span className="text-theme-primary font-medium">Total</span>
                <span className="text-theme-primary font-bold text-lg">
                  {formatPrice(total)}
                </span>
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
                  onClick={handleCheckout}
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
          )}
        </div>
      </div>

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        couponCode={couponCode}
      />
    </>
  );
}
