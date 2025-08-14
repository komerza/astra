"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/app/context/cart-context"
import { Button } from "@/components/ui/button"
import { Plus, Minus, X } from "lucide-react"
import Image from "next/image"
import { NotificationSystem, useNotifications } from "./notification-system"

export function CartDropdown() {
  const { state, dispatch } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const { notifications, addNotification, removeNotification } = useNotifications()

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  // Handle animation states
  useEffect(() => {
    if (state.isOpen) {
      setIsAnimating(true)
    }
  }, [state.isOpen])

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      dispatch({ type: "CLOSE_CART" })
    }, 300)
  }

  const handleRemoveItem = (itemKey: string, itemName: string) => {
    setRemovingItems((prev) => new Set(prev).add(itemKey))

    addNotification({
      type: "warning",
      title: "Item Removed",
      message: `${itemName} removed from cart`,
      duration: 3000,
    })

    setTimeout(() => {
      dispatch({ type: "REMOVE_ITEM", payload: itemKey })
      setRemovingItems((prev) => {
        const newSet = new Set(prev)
        newSet.delete(itemKey)
        return newSet
      })
    }, 300)
  }

  const handleQuantityChange = (itemKey: string, newQuantity: number, itemName: string) => {
    const oldItem = state.items.find((item) => `${item.id}-${item.variant}` === itemKey)
    if (oldItem && newQuantity > oldItem.quantity) {
      addNotification({
        type: "info",
        title: "Quantity Updated",
        message: `${itemName} quantity: ${newQuantity}`,
        duration: 2000,
      })
    }
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: itemKey, quantity: newQuantity },
    })
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Notification System */}
      <NotificationSystem notifications={notifications} onRemove={removeNotification} />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-theme-primary border-l border-theme shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-theme-primary text-lg heading-semibold">
            Cart <span className="text-theme-secondary text-sm font-normal">({itemCount} Items)</span>
          </h2>
          <Button
            onClick={handleClose}
            className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary btn-icon-sm rounded-md transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 flex flex-col px-6">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-theme-secondary text-sm tracking-20-smaller">
                  Your cart is empty. Add some items to get started!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-6 scrollbar-premium">
                {state.items.map((item, index) => {
                  const itemKey = `${item.id}-${item.variant}`
                  const isRemoving = removingItems.has(itemKey)

                  return (
                    <div
                      key={itemKey}
                      className={`rounded-xl border border-theme bg-theme-secondary p-4 shadow-lg backdrop-blur-md relative transition-all duration-300 ease-out ${
                        isRemoving
                          ? "translate-x-full opacity-0 scale-95"
                          : isAnimating
                            ? "translate-x-0 opacity-100 scale-100"
                            : "translate-x-8 opacity-0 scale-95"
                      }`}
                      style={{ transitionDelay: isRemoving ? "0ms" : `${index * 50}ms` }}
                    >
                      {/* Remove Button */}
                      <Button
                        onClick={() => handleRemoveItem(itemKey, item.name)}
                        className="absolute top-3 right-3 bg-transparent hover:bg-red-500/20 text-red-500 h-6 w-6 p-0 rounded-md transition-all duration-300"
                      >
                        <X className="w-3 h-3" />
                      </Button>

                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="w-12 h-12 rounded-lg border border-theme bg-theme-secondary flex items-center justify-center flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg?height=48&width=48&text=Product"}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-theme-primary text-sm heading-semibold mb-1 truncate">{item.name}</h3>
                          <p className="text-theme-secondary text-xs tracking-20-smaller">Variant: {item.variant}</p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Price */}
                            <div className="text-[#3B82F6] text-sm font-bold">
                              €{item.price.toFixed(2)}{" "}
                              <span className="text-theme-secondary text-xs font-normal">x{item.quantity}</span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleQuantityChange(itemKey, item.quantity - 1, item.name)}
                                className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-6 w-6 p-0 rounded-md transition-all duration-300"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>

                              <span className="text-theme-primary text-sm font-normal w-4 text-center">
                                {item.quantity}
                              </span>

                              <Button
                                onClick={() => handleQuantityChange(itemKey, item.quantity + 1, item.name)}
                                className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-6 w-6 p-0 rounded-md transition-all duration-300"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pricing Summary */}
              <div className="border-t border-theme pt-4 mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-theme-secondary text-sm tracking-20-smaller">Subtotal</span>
                  <span className="text-theme-primary text-sm">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-theme pt-2">
                  <span className="text-theme-primary text-base heading-semibold">Total</span>
                  <span className="text-[#3B82F6] text-xl font-bold">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Section */}
              <div className="space-y-4 pb-6">
                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleClose}
                    className="flex-1 bg-theme-primary hover:bg-theme-secondary text-theme-primary btn-sm rounded-md border border-theme shadow-lg tracking-20-smaller transition-all duration-300 font-normal"
                  >
                    Continue Shopping
                  </Button>
                  <Button className="flex-1 bg-[#3B82F6] text-white hover:bg-[#2563EB] btn-sm rounded-md tracking-20-smaller transition-all duration-300 font-normal">
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
