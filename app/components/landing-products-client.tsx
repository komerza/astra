"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, SmilePlus } from "lucide-react"

interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  image: string
}

export function LandingProductsClient() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function load() {
      const res = await globalThis.komerza.getStore()
      if (res.success && res.data) {
        const mapped: Product[] = res.data.products.slice(0, 3).map((p: any) => ({
          id: p.id,
          slug: p.slug ?? p.id,
          name: p.name,
          description: p.description,
          price: p.variants[0]?.cost || 0,
          image: p.imageNames[0] ? `https://cdn.komerza.com/${p.imageNames[0]}` : "/product-placeholder.png",
        }))
        setProducts(mapped)
      }
    }
    load()
  }, [])

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {products.map((p) => (
        <Link key={p.id} href={`/products/${p.slug}`}>
          <div className="group relative w-full rounded-2xl sm:rounded-3xl border border-theme bg-theme-secondary p-2 shadow-theme hover:border-[#3B82F6]/30 transition-all duration-300">
            <div className="relative w-full aspect-video cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#1d4ed8]/20"></div>
              <Image
                alt={p.name}
                fill
                className="object-cover duration-200 group-hover:scale-105"
                src={p.image}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-[#3B82F6] text-white border-0 text-xs">Best Seller</Badge>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-2">
              <h3 className="flex flex-wrap items-center gap-1 text-lg sm:text-xl font-semibold text-theme-primary">
                {p.name}
                <span className="ml-1 rounded-md border border-theme bg-theme-secondary px-2 py-0.5 text-xs shadow-md">
                  Software
                </span>
              </h3>
              <p className="text-theme-secondary text-sm line-clamp-2 mb-2">{p.description}</p>
              <div className="mt-2 flex w-full flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4">
                <Button className="w-full h-10 sm:h-12 rounded-full border border-theme bg-theme-secondary shadow-lg text-theme-primary font-normal text-sm sm:text-base px-4 hover:bg-gray-200 dark:hover:bg-white/15 transition-all duration-300">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  <span>Buy Now</span>
                </Button>
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-center sm:text-end text-xs text-theme-secondary">Starting at</span>
                  <span className="text-2xl sm:text-3xl font-bold text-[#3B82F6]">
                    <span className="mr-0.5 text-lg sm:text-xl">€</span>
                    {p.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

