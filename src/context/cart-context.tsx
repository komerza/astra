"use client"

import { createContext, useContext, useEffect, useReducer, useCallback, type ReactNode } from "react"
import { useKomerza } from "@/lib/use-komerza";

interface BasketItem {
  productId: string
  variantId: string
  quantity: number
}

interface CartState {
  items: BasketItem[]
  isOpen: boolean
}

type CartAction =
  | { type: "SET_ITEMS"; payload: BasketItem[] }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload }
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }
    case "OPEN_CART":
      return { ...state, isOpen: true }
    case "CLOSE_CART":
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })
  const { ready } = useKomerza();

  const refreshItems = useCallback(() => {
    if (!ready) return;
    const items = globalThis.komerza.getBasket();
    dispatch({ type: "SET_ITEMS", payload: items });
  }, [ready]);

  useEffect(() => {
    refreshItems();
  }, [refreshItems]);

  const addItem = (productId: string, variantId: string, quantity: number) => {
    if (!ready) return;
    globalThis.komerza.addToBasket(productId, variantId, quantity);
    refreshItems();
  };

  const removeItem = (productId: string, variantId: string) => {
    if (!ready) return;
    globalThis.komerza.removeFromBasket(productId, variantId);
    refreshItems();
  };

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    if (!ready) return;
    // Remove the item first, then add it back with the new quantity
    globalThis.komerza.removeFromBasket(productId, variantId);
    if (quantity > 0) {
      globalThis.komerza.addToBasket(productId, variantId, quantity);
    }
    refreshItems();
  };

  const clearCart = () => {
    if (!ready) return;
    globalThis.komerza.clearBasket();
    refreshItems();
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return ctx
}
