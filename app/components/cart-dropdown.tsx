"use client"

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Tag, X, Plus, Minus } from "lucide-react";
import { CheckoutModal } from "./checkout-modal";

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

  // Fetch product information when cart opens or items change
  useEffect(() => {
    const fetchProductsInfo = async () => {
      if (state.items.length === 0) return;

      try {
        const api: any = globalThis.komerza;
        if (!api || typeof api.getStore !== "function") return;

        const store = await api.getStore();
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
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to fetch product info:", error);
        }
      }
    };

    if (state.isOpen) {
      fetchProductsInfo();
    }
  }, [state.isOpen, state.items.length]);

  const handleCheckout = async () => {
    if (state.items.length === 0) return;
    setShowCheckoutModal(true);
  };

  if (!state.isOpen) return null;

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => dispatch({ type: "CLOSE_CART" })}
        />

        {/* Cart Panel */}
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
          <div className="flex-1 overflow-y-auto px-6 space-y-3">
            {state.items.length === 0 && (
              <p className="text-theme-secondary text-sm mt-6">
                Your cart is empty.
              </p>
            )}
            {state.items.map((item, idx) => {
              // Some upstream data might accidentally wrap the basket item inside productId.
              // Guard against productId (or others) being an object to prevent the React child error.
              const unwrap = (val: any) =>
                val && typeof val === "object"
                  ? JSON.stringify(val)
                  : String(val);
              const productId =
                typeof item.productId === "object" &&
                (item as any).productId?.productId
                  ? (item as any).productId.productId
                  : item.productId;
              const variantId =
                item.variantId ||
                (typeof item.productId === "object" &&
                  (item as any).productId?.variantId) ||
                "";
              const quantity =
                item.quantity ||
                (typeof item.productId === "object" &&
                  (item as any).productId?.quantity) ||
                1;

              // Get product info from our fetched data
              const productInfo = productsInfo[String(productId)];
              const variantInfo = productInfo?.variants.find(
                (v) => v.id === String(variantId)
              );

              const displayName =
                productInfo?.name || `Product ${unwrap(productId)}`;
              const displayVariant =
                variantInfo?.name ||
                (variantId ? `Variant ${unwrap(variantId)}` : "Standard");
              const displayPrice = variantInfo?.cost || 0;
              const totalPrice = displayPrice * Number(quantity);

              return (
                <div
                  key={`${unwrap(productId)}-${unwrap(variantId)}-${idx}`}
                  className="p-4 border border-theme rounded-lg bg-theme-secondary space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-theme-primary text-sm font-medium">
                        {displayName}
                      </h4>
                      <p className="text-theme-secondary text-xs">
                        {displayVariant}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-theme-primary text-sm font-medium">
                        €{displayPrice.toFixed(2)}
                      </p>
                      {Number(quantity) > 1 && (
                        <p className="text-theme-secondary text-xs">
                          €{totalPrice.toFixed(2)} total
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
                          onClick={() => {
                            const currentQuantity = Number(quantity);
                            if (currentQuantity > 1) {
                              updateQuantity(
                                String(productId),
                                String(variantId),
                                currentQuantity - 1
                              );
                            }
                          }}
                          disabled={Number(quantity) <= 1}
                          className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-6 w-6 p-0 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-theme-primary text-sm font-medium min-w-[20px] text-center">
                          {unwrap(quantity)}
                        </span>
                        <Button
                          onClick={() => {
                            const currentQuantity = Number(quantity);
                            updateQuantity(
                              String(productId),
                              String(variantId),
                              currentQuantity + 1
                            );
                          }}
                          className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-6 w-6 p-0 rounded flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        removeItem(String(productId), String(variantId))
                      }
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
              {/* Cart Total */}
              <div className="flex justify-between items-center py-2 border-b border-theme">
                <span className="text-theme-primary font-medium">Total</span>
                <span className="text-theme-primary font-bold text-lg">
                  €
                  {state.items
                    .reduce((total, item) => {
                      const productId =
                        typeof item.productId === "object" &&
                        (item as any).productId?.productId
                          ? (item as any).productId.productId
                          : item.productId;
                      const variantId =
                        item.variantId ||
                        (typeof item.productId === "object" &&
                          (item as any).productId?.variantId) ||
                        "";
                      const quantity =
                        item.quantity ||
                        (typeof item.productId === "object" &&
                          (item as any).productId?.quantity) ||
                        1;

                      const productInfo = productsInfo[String(productId)];
                      const variantInfo = productInfo?.variants.find(
                        (v) => v.id === String(variantId)
                      );
                      const price = variantInfo?.cost || 0;

                      return total + price * Number(quantity);
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Coupon Input */}
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

              {/* Action Buttons */}
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

      {/* Reusable Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        couponCode={couponCode}
      />
    </>
  );
}
