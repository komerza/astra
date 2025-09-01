"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { ProductActions } from "./product-actions"
import type { Product, ProductVariant } from "@/types/product";

interface ProductActionsWrapperProps {
  product: Product;
  formatter: Intl.NumberFormat;
}

export function ProductActionsWrapper({
  product,
  formatter,
}: ProductActionsWrapperProps) {
  // Ensure variants exist and have at least one item
  const variants: ProductVariant[] =
    product.variants && product.variants.length > 0 ? product.variants : [];

  const [currentPrice, setCurrentPrice] = useState<number>(
    variants[0].price
  );

  // Default values for optional properties
  const rating = product.rating || 0;
  const reviews = product.reviews || 0;
  const category = product.category || "Standard";

  return (
    <div className="space-y-6">
      {/* Product Header with Dynamic Price */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl heading-semibold text-gray-900 dark:text-white">
              {product.name}
            </h1>
          </div>

          {/* Dynamic Price Display */}
          <div className="text-right">
            <div className="text-3xl md:text-4xl font-bold text-[#3B82F6]">
              <span className="text-2xl"></span>
              {formatter.format(currentPrice)}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-[#3B82F6] fill-[#3B82F6]"
                    : "text-gray-600"
                }`}
              />
            ))}
            <span className="text-gray-900 dark:text-white text-sm ml-2">
              {rating}
            </span>
          </div>
          {reviews > 0 && (
            <span className="text-[#808080] text-sm">({reviews} reviews)</span>
          )}
          <span className="rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/50 px-3 py-1 text-xs text-[#3B82F6]">
            {category}
          </span>
        </div>
      </div>

      {/* Product Actions Component */}
      <ProductActions
        product={{
          ...product,
          variants,
        }}
        formatter={formatter}
        onPriceChange={setCurrentPrice}
      />
    </div>
  );
}
