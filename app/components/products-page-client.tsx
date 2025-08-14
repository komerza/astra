"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/app/context/cart-context"

interface Variant {
  id: string
  name: string
  cost: number
}

interface ProductReference {
  id: string
  name: string
  description: string
  imageNames: string[]
  variants: Variant[]
  slug: string
}

export function ProductsPageClient() {
  const [products, setProducts] = useState<ProductReference[]>([])
  const { addItem } = useCart()

  useEffect(() => {
    async function load() {
      const res = await globalThis.komerza.getStore()
      if (res.success && res.data) {
        setProducts(res.data.products)
      }
    }
    load()
  }, [])

  if (products.length === 0) {
    return <p className="text-theme-secondary">No products available.</p>
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p.id} className="border border-theme bg-theme-secondary rounded-2xl p-4 flex flex-col gap-2">
          <h3 className="text-theme-primary text-lg font-semibold">{p.name}</h3>
          <p className="text-theme-secondary text-sm line-clamp-2">{p.description}</p>
          <div className="flex items-center justify-between mt-auto">
            {p.variants[0] && (
              <span className="text-[#3B82F6] font-bold">€{p.variants[0].cost.toFixed(2)}</span>
            )}
            {p.variants[0] && (
              <Button
                onClick={() => addItem(p.id, p.variants[0].id, 1)}
                className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Link href={`/products/${p.slug}`} className="text-sm text-theme-secondary underline mt-2">
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}
