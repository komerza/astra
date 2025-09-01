import { useEffect, useState } from "react";
import { useKomerza } from "@/KomerzaProvider";
import { mapKomerzaProduct } from "@/lib/store-data";
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
      const api: any = globalThis.komerza;
      if (!api) {
        setError("Komerza API not available");
        return;
      }
      try {
        setLoading(true);
        setError(null);
        if (typeof api.getProduct === "function") {
          const res = await api.getProduct({ idOrSlug });
          if (!cancelled && res?.success && res.data) {
            setProduct(mapKomerzaProduct(res.data));
            return;
          }
        }
        if (typeof api.getStore === "function") {
          const store = await api.getStore();
          if (
            !cancelled &&
            store?.success &&
            store.data?.products
          ) {
            const found = store.data.products.find(
              (p: any) => p.id === idOrSlug || p.slug === idOrSlug
            );
            if (found) {
              setProduct(mapKomerzaProduct(found));
              return;
            }
          }
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
