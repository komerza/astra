/**
 * Komerza API Cache Layer
 * Provides memory-based caching with TTL support to reduce API calls
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

interface KomerzaCacheConfig {
  storeDataTTL: number;
  productDataTTL: number;
  reviewsTTL: number;
  bannerTTL: number;
}

class KomerzaCache {
  private cache = new Map<string, CacheEntry<any>>();
  private pendingRequests = new Map<string, Promise<any>>(); // Track in-flight requests
  private requestCount = 0; // Track total requests made
  private config: KomerzaCacheConfig;

  constructor(config: Partial<KomerzaCacheConfig> = {}) {
    this.config = {
      storeDataTTL: 5 * 60 * 1000, // 5 minutes
      productDataTTL: 2 * 60 * 1000, // 2 minutes
      reviewsTTL: 10 * 60 * 1000, // 10 minutes
      bannerTTL: 30 * 60 * 1000, // 30 minutes
      ...config,
    };
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private set<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || this.isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }

  // Store data cache
  async getStore(): Promise<any> {
    const key = "store";

    // Add stack trace for debugging
    const stack = new Error().stack;
    const caller = stack?.split("\n")[2]?.trim() || "unknown";
    console.log(`🔍 getStore called from: ${caller}`);

    // Check cache first
    const cached = this.get(key);
    if (cached) {
      console.log("📦 Using cached store data");
      return cached;
    }

    // Check if request is already in flight
    if (this.pendingRequests.has(key)) {
      console.log("⏳ Store request already in flight, waiting...");
      return this.pendingRequests.get(key);
    }

    console.log("🌐 Fetching fresh store data");
    this.requestCount++;
    console.log(`📊 Total API requests made: ${this.requestCount}`);

    const api: any = (globalThis as any).komerza;
    if (!api || typeof api.getStore !== "function") {
      throw new Error("Komerza API not available");
    }

    // Create and store the pending request
    const requestPromise = api
      .getStore()
      .then((result: any) => {
        if (result?.success) {
          this.set(key, result, this.config.storeDataTTL);
        }
        return result;
      })
      .finally(() => {
        // Clean up pending request
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  // Product data cache
  async getProduct(idOrSlug: string): Promise<any> {
    const key = `product:${idOrSlug}`;

    // Check cache first
    const cached = this.get(key);
    if (cached) {
      console.log(`📦 Using cached product data for ${idOrSlug}`);
      return cached;
    }

    // Check if request is already in flight
    if (this.pendingRequests.has(key)) {
      console.log(
        `⏳ Product request for ${idOrSlug} already in flight, waiting...`
      );
      return this.pendingRequests.get(key);
    }

    console.log(`🌐 Fetching fresh product data for ${idOrSlug}`);
    const api: any = (globalThis as any).komerza;

    const fetchProduct = async () => {
      // Try direct product fetch first
      if (api && typeof api.getProduct === "function") {
        try {
          const result = await api.getProduct(idOrSlug);
          if (result?.success && result.data) {
            this.set(key, result, this.config.productDataTTL);
            return result;
          }
        } catch (e) {
          console.warn(`Direct product fetch failed for ${idOrSlug}:`, e);
        }
      }

      // Fallback: try to find in store data
      try {
        const storeData = await this.getStore();
        if (storeData?.success && storeData.data?.products) {
          const found = storeData.data.products.find(
            (p: any) => p.id === idOrSlug || p.slug === idOrSlug
          );
          if (found) {
            const result = { success: true, data: found };
            this.set(key, result, this.config.productDataTTL);
            return result;
          }
        }
      } catch (e) {
        console.warn(`Store-based product lookup failed for ${idOrSlug}:`, e);
      }

      return { success: false, data: null };
    };

    const requestPromise = fetchProduct().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  // Product reviews cache
  async getProductReviews(productId: string, page: number = 1): Promise<any> {
    const key = `reviews:${productId}:${page}`;

    // Check cache first
    const cached = this.get(key);
    if (cached) {
      console.log(`📦 Using cached reviews for ${productId} page ${page}`);
      return cached;
    }

    // Check if request is already in flight
    if (this.pendingRequests.has(key)) {
      console.log(
        `⏳ Reviews request for ${productId} page ${page} already in flight, waiting...`
      );
      return this.pendingRequests.get(key);
    }

    console.log(`🌐 Fetching fresh reviews for ${productId} page ${page}`);
    const api: any = (globalThis as any).komerza;
    if (!api || typeof api.getProductReviews !== "function") {
      throw new Error("Product reviews API not available");
    }

    const requestPromise = api
      .getProductReviews(productId, page)
      .then((result: any) => {
        if (result?.success) {
          this.set(key, result, this.config.reviewsTTL);
        }
        return result;
      })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  // Store banner cache
  async getStoreBannerUrl(): Promise<string | null> {
    const key = "banner";

    // Check cache first
    const cached = this.get<string>(key);
    if (cached) {
      console.log("📦 Using cached store banner");
      return cached;
    }

    // Check if request is already in flight
    if (this.pendingRequests.has(key)) {
      console.log("⏳ Banner request already in flight, waiting...");
      return this.pendingRequests.get(key);
    }

    console.log("🌐 Fetching fresh store banner");
    const api: any = (globalThis as any).komerza;
    if (!api || typeof api.getStoreBannerUrl !== "function") {
      throw new Error("Store banner API not available");
    }

    const requestPromise = api
      .getStoreBannerUrl()
      .then((result: any) => {
        if (result) {
          this.set(key, result, this.config.bannerTTL);
        }
        return result;
      })
      .finally(() => {
        this.pendingRequests.delete(key);
      });

    this.pendingRequests.set(key, requestPromise);
    return requestPromise;
  }

  // Clear specific cache entries
  clearProduct(idOrSlug: string): void {
    this.cache.delete(`product:${idOrSlug}`);
  }

  clearProductReviews(productId: string): void {
    // Clear all review pages for this product
    for (const key of this.cache.keys()) {
      if (key.startsWith(`reviews:${productId}:`)) {
        this.cache.delete(key);
      }
    }
  }

  clearStore(): void {
    this.cache.delete("store");
  }

  clearBanner(): void {
    this.cache.delete("banner");
  }

  // Clear all cache
  clearAll(): void {
    this.cache.clear();
    this.pendingRequests.clear(); // Also clear pending requests
    console.log("🗑️ All cache cleared");
  }

  // Get cache stats
  getStats(): {
    size: number;
    keys: string[];
    requestCount: number;
    pendingRequests: number;
  } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      requestCount: this.requestCount,
      pendingRequests: this.pendingRequests.size,
    };
  }

  // Manual cache warming - preload commonly used data
  async warmCache(): Promise<void> {
    console.log("🔥 Warming cache...");
    try {
      // Only warm banner cache - store data will be fetched by components as needed
      await this.getStoreBannerUrl();
      console.log("✅ Cache warming completed");
    } catch (e) {
      console.warn("⚠️ Cache warming failed:", e);
    }
  }
}

// Singleton instance
export const komerzaCache = new KomerzaCache();

// Helper hook for cache warming
export function useKomerzaCacheWarming() {
  return {
    warmCache: () => komerzaCache.warmCache(),
    clearCache: () => komerzaCache.clearAll(),
    getStats: () => komerzaCache.getStats(),
  };
}
