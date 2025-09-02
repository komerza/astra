import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
  createElement,
} from "react";
import { useKomerza } from "@/KomerzaProvider";
import { komerzaCache } from "@/lib/komerza-cache";
import type { Product, ProductVariant } from "@/types/product";

// Types returned by Komerza store API
interface VariantReference {
  id: string;
  name: string;
  cost: number;
  description?: string;
  stock?: number;
  stockMode?: number;
  imageNames?: string[]; // Array of image names for this variant
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
    imageNames: v.imageNames, // Include variant images
  }));

  // Determine stock status based on the first variant
  const firstVariant = p.variants[0];
  let stockStatus = "In Stock";

  if (firstVariant) {
    switch (firstVariant.stockMode) {
      case 0: // Calculated
      case 2: // Fixed
        stockStatus =
          (firstVariant.stock || 0) > 0 ? "In Stock" : "Out of Stock";
        break;
      case 1: // Ignored
        stockStatus = "In Stock"; // Always available
        break;
      default:
        stockStatus = "In Stock";
    }
  }

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
    image:
      p.imageNames && p.imageNames[0]
        ? `https://user-generated-content.komerza.com/${p.imageNames[0]}`
        : "/product-placeholder.png",
    imageNames: p.imageNames, // Include product images
    description: p.description || "High-quality software solution",
    features: [],
    status: stockStatus,
    popular: p.isBestSeller || false,
    variants,
  };
}

interface StoreDataState {
  products: Product[];
  loading: boolean;
}

const StoreDataContext = createContext<StoreDataState>({
  products: [],
  loading: true,
});

export function StoreDataProvider({ children }: { children: ReactNode }) {
  const { ready } = useKomerza();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchInitiated = useRef(false); // Track if we've already started fetching

  useEffect(() => {
    // Only trigger if we're ready and haven't started fetching yet
    if (!ready || fetchInitiated.current) return;

    fetchInitiated.current = true;
    let cancelled = false;

    console.log("🏪 StoreDataProvider: Initiating store data fetch");

    (async () => {
      try {
        setLoading(true);
        // Use cached store fetch
        const res = await komerzaCache.getStore();

        if (cancelled) return; // Exit early if cancelled

        if (res?.success && res.data?.products) {
          const mapped: Product[] = res.data.products.map(mapKomerzaProduct);
          setProducts(mapped);
          console.log(
            `🏪 StoreDataProvider: Store data loaded successfully (${mapped.length} products)`
          );
        } else {
          console.warn(
            "🏪 StoreDataProvider: Store data fetch unsuccessful",
            res
          );
          setProducts([]); // Ensure empty array on failure
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load store data:", e);
        }
        if (!cancelled) {
          setProducts([]); // Ensure empty array on error
        }
      } finally {
        if (!cancelled) {
          setLoading(false); // Always set loading to false when done
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready]); // Only depend on ready, not products.length

  return createElement(
    StoreDataContext.Provider,
    { value: { products, loading } },
    children
  );
}

export function useStoreData() {
  return useContext(StoreDataContext);
}
