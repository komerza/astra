"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, CreditCard } from "lucide-react"
import { useCart } from "@/app/context/cart-context"
import { useNotifications } from "./notification-system"

interface ProductVariant {
  id: string
  name: string
  price: number
  description: string
}

interface Product {
  id: string
  name: string
  game: string
  basePrice: number
  variants: ProductVariant[]
  image: string
}

interface ProductActionsProps {
  product: Product
  onPriceChange: (price: number) => void
}

export function ProductActions({ product, onPriceChange }: ProductActionsProps) {
  // Ensure variants exist and are valid
  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [
          {
            id: "default",
            name: "Standard License",
            price: product.basePrice,
            description: "Standard access",
          },
        ]

  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()
  const { addNotification } = useNotifications()

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant)
    onPriceChange(variant.price * quantity)
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
    onPriceChange(selectedVariant.price * newQuantity)
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: selectedVariant.price,
        variant: selectedVariant.name,
        image: product.image,
        game: product.game,
        quantity,
      },
    })

    // Show notification
    addNotification({
      type: "success",
      title: "Added to Cart!",
      message: `${product.name} (${selectedVariant.name}) added to cart`,
      duration: 3000,
    })

    dispatch({ type: "OPEN_CART" })
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // Here you would typically redirect to checkout
  }

  return (
    <div className="space-y-6">
      {/* License Selector with Quantity on same line */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg heading-semibold text-gray-900 dark:text-white">Choose License</h3>

          {/* Quantity Selector - Matching the design */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#808080] tracking-20-smaller">Qty:</span>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                className="bg-transparent border border-white/20 text-gray-900 dark:text-white hover:bg-white/10 font-semibold h-8 w-8 p-0 rounded-md transition-all duration-300"
              >
                <Minus className="w-4 h-4" />
              </Button>

              <div className="flex items-center justify-center w-8 h-8 text-gray-900 dark:text-white font-medium text-sm">
                {quantity}
              </div>

              <Button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="bg-transparent border border-white/20 text-gray-900 dark:text-white hover:bg-white/10 font-semibold h-8 w-8 p-0 rounded-md transition-all duration-300"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Variant Options */}
        <div className="space-y-3">
          {variants.map((variant) => (
            <div
              key={variant.id}
              onClick={() => handleVariantChange(variant)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selectedVariant.id === variant.id
                  ? "border-[#3B82F6] bg-[#3B82F6]/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-900 dark:text-white heading-semibold">{variant.name}</h4>
                  <p className="text-[#808080] text-sm">{variant.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-[#3B82F6] font-bold text-lg">€{variant.price.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons - 70% Buy Now, 30% Add to Cart */}
      <div className="flex gap-3">
        <Button
          onClick={handleBuyNow}
          className="flex-[0.7] bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm tracking-20-smaller transition-all duration-300 whitespace-nowrap"
        >
          <CreditCard className="w-4 h-4" />
          <span>Buy Now</span>
        </Button>

        <Button
          onClick={handleAddToCart}
          className="flex-[0.3] bg-[#050505] hover:bg-[#1a1a1a] text-white h-8 px-4 py-2 rounded-md border border-[rgba(255,255,255,0.2)] shadow-lg flex items-center justify-center gap-2 text-sm tracking-20-smaller transition-all duration-300 whitespace-nowrap"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
        </Button>
      </div>
    </div>
  )
}
