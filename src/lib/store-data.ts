import { createContext, useContext, useEffect, useState, type ReactNode, createElement } from "react";
import { useKomerza } from "@/KomerzaProvider";
import type { Product, ProductVariant } from "@/types/product";

// Types returned by Komerza store API
interface VariantReference {
  id: string;
  name: string;
  cost: number;
  description?: string;
  stock?: number;
  stockMode?: number;
}

export interface ProductReference {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  imageNames?: string[];
  variants: VariantReference[];
  rating?: number;
  isBestSeller?: boolean;
}

export function mapKomerzaProduct(p: ProductReference): Product {
  const variants: ProductVariant[] = (p.variants || []).map((v) => ({
    id: v.id,
    name: v.name,
    price: v.cost,
    description: v.description,
    stock: v.stock,
    stockMode: v.stockMode,
  }));

  return {
    id: p.id,
    slug: p.slug ?? p.id,
    name: p.name,
    game: "Software",
    category: "software",
    basePrice: variants[0]?.price || 0,
    maxPrice: variants[0]?.price || 0,
    rating: p.rating || 4.5,
    reviews: Math.floor(Math.random() * 100) + 10,
    image: p.imageNames && p.imageNames[0]
      ? `https://user-generated-content.komerza.com/${p.imageNames[0]}`
      : "/product-placeholder.png",
    description: p.description || "High-quality software solution",
    features: [],
    status: "In Stock",
    popular: p.isBestSeller || false,
    variants,
  };
}

interface StoreDataState {
  products: Product[];
  loading: boolean;
}

const StoreDataContext = createContext<StoreDataState>({ products: [], loading: true });

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const { ready } = useKomerza();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || products.length > 0) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await globalThis.komerza.getStore();
        if (res.success && res.data && !cancelled) {
          const mapped: Product[] = res.data.products.map(mapKomerzaProduct);
          setProducts(mapped);
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load store data:", e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, products.length]);

  return createElement(
    StoreDataContext.Provider,
    { value: { products, loading } },
    children,
  );
}

export function useStoreData() {
  return useContext(StoreDataContext);
}

