import { useEffect, useState } from "react";
import { useKomerza } from "@/KomerzaProvider";
import { mapKomerzaProduct } from "@/lib/store-data";
import { komerzaCache } from "@/lib/komerza-cache";
import type { Product } from "@/types/product";

export function useProductData(idOrSlug: string | null) {
  const { ready } = useKomerza();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrSlug || !ready) return;
    let cancelled = false;

    async function load() {
      if (!idOrSlug) return;

      try {
        setLoading(true);
        setError(null);
        console.log("Loading product", idOrSlug);

        // Use cached product fetch
        const result = await komerzaCache.getProduct(idOrSlug);
        if (!cancelled && result?.success && result.data) {
          setProduct(mapKomerzaProduct(result.data));
          console.log("setProduct", result.data);
          return;
        }

        // Only set error if we reach here (product not found)
        if (!cancelled) {
          setError("Product not found");
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load product", e);
        }
        if (!cancelled) setError("Failed to load product");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [idOrSlug, ready]);

  return { product, loading, error };
}
