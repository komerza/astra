"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ProductImageGallery } from "@/app/components/product-image-gallery"
import { ProductActionsWrapper } from "@/app/components/product-actions-wrapper"
import { ProductDescriptionTabs } from "@/app/components/product-description-tabs"

interface Variant {
  id: string
  name: string
  cost: number
  description?: string
}

interface ProductReference {
  id: string
  name: string
  description: string
  imageNames: string[]
  variants: Variant[]
  rating: number
}

export function ProductPageClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductReference | null>(null)

  useEffect(() => {
    async function load() {
      const res = await globalThis.komerza.getProduct({ idOrSlug: slug })
      if (res.success && res.data) {
        setProduct(res.data)
      }
    }
    load()
  }, [slug])

  if (!product) {
    return <p className="text-theme-secondary">Loading...</p>
  }

  const images =
    product.imageNames.length > 0
      ? product.imageNames.map((name) => `https://cdn.komerza.com/${name}`)
      : ["/product-placeholder.png"]

  const actionProduct = {
    id: product.id,
    name: product.name,
    game: "",
    basePrice: product.variants[0]?.cost || 0,
    variants: product.variants.map((v) => ({
      id: v.id,
      name: v.name,
      price: v.cost,
      description: v.description || "",
    })),
    image: images[0],
    rating: product.rating,
    reviews: 0,
    category: "",
  }

  const tabsProduct = {
    id: product.id,
    name: product.name,
    longDescription: product.description,
    features: [] as string[],
    reviewsData: {
      averageRating: product.rating,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      recentReviews: [] as any[],
    },
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div>
        <ProductImageGallery images={images} productName={product.name} />
      </div>
      <div className="space-y-6">
        <ProductActionsWrapper product={actionProduct} />
      </div>
      <div className="lg:col-span-2 mt-16">
        <ProductDescriptionTabs product={tabsProduct} />
      </div>
      <div className="lg:col-span-2 mt-8">
        <Link href="/products" className="text-sm text-theme-secondary underline">
          Back to Products
        </Link>
      </div>
    </div>
  )
}

