"use client"

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { CartDropdown } from "./cart-dropdown"

export function CartButton() {
  const { dispatch } = useCart()

  const itemCount =
    typeof window !== "undefined"
      ? globalThis.komerza?.getBasketItemCount?.() ?? 0
      : 0

  return (
    <div className="relative">
      <Button
        onClick={() => dispatch({ type: "TOGGLE_CART" })}
        className="bg-transparent border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 h-8 w-8 md:w-auto md:px-3 p-0 md:py-2 rounded-md flex items-center justify-center md:gap-2 text-sm tracking-20-smaller transition-all duration-300 relative"
      >
        <ShoppingCart className="w-4 h-4" />
        <span className="hidden md:inline">Cart</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#3B82F6] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {itemCount}
          </span>
        )}
      </Button>

      <CartDropdown />
    </div>
  )
}
