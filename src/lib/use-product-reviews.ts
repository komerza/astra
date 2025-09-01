import { useCallback, useEffect, useState } from "react";
import type { Review } from "@/types/product";
import type { PaginatedApiResponse } from "@/types/api";
import { formatReviews, ApiReview } from "@/lib/review-utils";

export function useProductReviews(productId: string | null) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadReviews = useCallback(
    async (pageToLoad: number = 1) => {
      if (!productId) return;
      const api: any = globalThis.komerza;
      if (!api || typeof api.getProductReviews !== "function") return;
      try {
        setLoading(true);
        const response: PaginatedApiResponse<ApiReview> = await api.getProductReviews(
          productId,
          pageToLoad
        );
        if (response.success && response.data) {
          setReviews((prev) =>
            pageToLoad === 1
              ? formatReviews(response.data!)
              : [...prev, ...formatReviews(response.data!)]
          );
          setTotalPages(response.pages);
          setPage(pageToLoad);
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error loading reviews:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [productId]
  );

  useEffect(() => {
    if (productId) {
      loadReviews(1);
    } else {
      setReviews([]);
      setPage(1);
      setTotalPages(0);
    }
  }, [productId, loadReviews]);

  const loadMore = () => {
    if (productId && page < totalPages && !loading) {
      loadReviews(page + 1);
    }
  };

  return { reviews, loading, page, totalPages, loadMore };
}
