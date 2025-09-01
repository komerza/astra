"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { parseCartItem, unwrap } from "@/lib/cart-utils";

interface ProductInfo {
  id: string;
  name: string;
  variants: Array<{ id: string; name: string; cost: number }>;
}

interface CartItemProps {
  item: any;
  productsInfo: Record<string, ProductInfo>;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
}

export function CartItem({
  item,
  productsInfo,
  removeItem,
  updateQuantity,
}: CartItemProps) {
  const { productId, variantId, quantity } = parseCartItem(item);
  const productInfo = productsInfo[productId];
  const variantInfo = productInfo?.variants.find((v) => v.id === variantId);
  const displayName = productInfo?.name || `Product ${unwrap(productId)}`;
  const displayVariant =
    variantInfo?.name || (variantId ? `Variant ${unwrap(variantId)}` : "Standard");
  const displayPrice = variantInfo?.cost || 0;
  const totalPrice = displayPrice * Number(quantity);

  return (
    <div className="p-4 border border-theme rounded-lg bg-theme-secondary space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="text-theme-primary text-sm font-medium">{displayName}</h4>
          <p className="text-theme-secondary text-xs">{displayVariant}</p>
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
          <span className="text-theme-secondary text-xs">Quantity:</span>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => {
                const currentQuantity = Number(quantity);
                if (currentQuantity > 1) {
                  updateQuantity(productId, variantId, currentQuantity - 1);
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
                updateQuantity(productId, variantId, currentQuantity + 1);
              }}
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
}
