"use client";

import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CheckoutModal } from "./checkout-modal";
import { useCartProductsInfo } from "@/lib/use-cart-products-info";
import { CartItem } from "@/components/cart-item";
import { CartSummary } from "@/components/cart-summary";
import { parseCartItem } from "@/lib/cart-utils";

export function CartDropdown() {
  const { state, dispatch, clearCart, removeItem, updateQuantity } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const productsInfo = useCartProductsInfo(state.isOpen);

  const handleCheckout = async () => {
    if (state.items.length === 0) return;
    setShowCheckoutModal(true);
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
              Shopping Cart <span className="text-theme-secondary text-sm font-normal">({itemCount} Items)</span>
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
              <p className="text-theme-secondary text-sm mt-6">Your cart is empty.</p>
            )}
            {state.items.map((item, idx) => {
              const { productId, variantId } = parseCartItem(item);
              return (
                <CartItem
                  key={`${productId}-${variantId}-${idx}`}
                  item={item}
                  productsInfo={productsInfo}
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
                />
              );
            })}
          </div>
          {state.items.length > 0 && (
            <CartSummary
              items={state.items}
              productsInfo={productsInfo}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              onCheckout={handleCheckout}
              clearCart={clearCart}
            />
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
