"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProductRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get("slug")
    if (slug) {
      router.replace(`/products/${encodeURIComponent(slug)}`)
    }
  }, [router])

  return null
}
