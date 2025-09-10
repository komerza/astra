"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { ProductActions } from "./product-actions";
import { useFormatter } from "@/lib/formatter";

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Product {
  id: string;
  name: string;
  game: string;
  basePrice: number;
  variants?: ProductVariant[];
  image: string;
  rating?: number;
  reviews?: number;
  category?: string;
}

interface ProductActionsWrapperProps {
  product: Product;
}

export function ProductActionsWrapper({ product }: ProductActionsWrapperProps) {
  const { formatPrice } = useFormatter();
  // Ensure variants exist and have at least one item
  const variants =
    product.variants && product.variants.length > 0 ? product.variants : [];

  const [currentPrice, setCurrentPrice] = useState(variants[0].price);

  // Default values for optional properties
  const rating = product.rating || 0;
  const reviews = product.reviews || 0;
  const category = product.category || "Standard";

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl heading-semibold text-gray-900 dark:text-white">
              {product.name}
            </h1>
          </div>

          <div className="text-right">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              <span className="text-2xl"></span>
              {formatPrice(currentPrice)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-primary fill-primary"
                    : "text-gray-500"
                }`}
              />
            ))}
            <span className="text-gray-900 dark:text-white text-sm ml-2">
              {rating}
            </span>
          </div>
          {reviews > 0 && (
            <span className="text-gray-400 text-sm">({reviews} reviews)</span>
          )}
          <span className="rounded-full bg-primary/10 border border-primary-500 px-3 py-1 text-xs text-primary">
            {category}
          </span>
        </div>
      </div>

      <ProductActions
        product={{
          ...product,
          variants,
        }}
        onPriceChange={setCurrentPrice}
      />
    </div>
  );
}
