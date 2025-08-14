"use client"

import { useCart } from "@/app/context/cart-context"
import { Button } from "@/components/ui/button"

export function CartDropdown() {
  const { state, dispatch, clearCart, removeItem } = useCart()

  if (!state.isOpen) return null

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-theme-primary border-l border-theme shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-theme-primary text-lg heading-semibold">
          Cart <span className="text-theme-secondary text-sm font-normal">({itemCount} Items)</span>
        </h2>
        <Button
          onClick={() => dispatch({ type: "CLOSE_CART" })}
          className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary btn-icon-sm rounded-md transition-all duration-300"
        >
          Close
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 space-y-3">
        {state.items.length === 0 && (
          <p className="text-theme-secondary text-sm">Your cart is empty.</p>
        )}
        {state.items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="p-4 border border-theme rounded-lg bg-theme-secondary space-y-2"
          >
            <p className="text-theme-primary text-sm">Product: {item.productId}</p>
            <p className="text-theme-secondary text-sm">Variant: {item.variantId}</p>
            <p className="text-theme-secondary text-sm">Quantity: {item.quantity}</p>
            <Button
              onClick={() => removeItem(item.productId, item.variantId)}
              className="bg-transparent border border-theme text-theme-primary hover:bg-theme-tertiary px-2 py-1 text-xs"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
      {state.items.length > 0 && (
        <div className="p-6 border-t border-theme">
          <Button
            onClick={clearCart}
            className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary px-4"
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  )
}
