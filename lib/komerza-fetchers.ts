export interface Variant {
  id: string
  name: string
  cost: number
  description?: string
}

export interface ProductReference {
  id: string
  name: string
  description: string
  imageNames: string[]
  variants: Variant[]
}

export interface Review {
  id: string
  rating: number
  reason: string
  productId?: string
  reply?: string
  dateCreated: string
}

export interface PaginatedApiResponse<T> {
  success: boolean
  message?: string
  data?: T[]
  pages: number
}

export async function fetchProduct(
  slug: string
): Promise<ProductReference | null> {
  const api: any = globalThis.komerza
  if (!api) return null

  if (typeof api.getProduct === "function") {
    const res = await api.getProduct({ idOrSlug: slug })
    if (res?.success && res.data) {
      return res.data
    }
  }

  if (typeof api.getStore === "function") {
    const store = await api.getStore()
    if (store?.success && store.data?.products) {
      const found = store.data.products.find(
        (p: any) => p.id === slug || p.slug === slug
      )
      if (found) {
        return found
      }
    }
  }

  return null
}

export async function fetchProductReviews(
  productId: string,
  page: number = 1
): Promise<PaginatedApiResponse<Review>> {
  const api: any = globalThis.komerza
  if (!api || typeof api.getProductReviews !== "function") {
    return { success: false, pages: 0 }
  }

  return api.getProductReviews(productId, page)
}

