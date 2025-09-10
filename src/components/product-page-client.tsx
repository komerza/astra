"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductActionsWrapper } from "@/components/product-actions-wrapper";
import { ProductDescriptionTabs } from "@/components/product-description-tabs";

interface Variant {
  id: string;
  name: string;
  cost: number;
  description?: string;
  stock?: number;
  stockMode?: number;
}

interface ProductReference {
  id: string;
  name: string;
  description: string;
  imageNames: string[];
  variants: Variant[];
}

interface Review {
  id: string;
  rating: number;
  reason: string;
  productId?: string;
  reply?: string;
  dateCreated: string;
}

interface PaginatedApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T[];
  pages: number;
}

let formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export function ProductPageClient() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-theme-secondary">Loading product...</p>
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}

function ProductPageContent() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("id") || searchParams.get("slug"); // Support both id and slug

  const [product, setProduct] = useState<ProductReference | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("No product ID provided");
      setLoading(false);
      return;
    }

    async function load() {
      const api: any = globalThis.komerza;
      if (!api) {
        setError("Komerza API not available");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        if (typeof api.getProduct === "function") {
          const res = await api.getProduct(slug);
          if (res?.success && res.data) {
            setProduct(res.data);
            // Load reviews for this product
            loadReviews(res.data.id, 1);
            setLoading(false);
            return;
          }
        }
        // Fallback: fetch full store and locate product by id or slug
        if (typeof api.getStore === "function") {
          const store = await api.getStore();
          if (store?.success && store.data?.products) {
            const found = store.data.products.find(
              (p: any) => p.id === slug || p.slug === slug
            );
            if (found) {
              setProduct(found);
              // Load reviews for this product
              loadReviews(found.id, 1);
            } else {
              setError("Product not found");
            }
          } else {
            setError("Failed to load store data");
          }
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load product", e);
        }
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  const loadReviews = async (productId: string, page: number = 1) => {
    const api: any = globalThis.komerza;
    if (!api || typeof api.getProductReviews !== "function") return;

    formatter = await globalThis.komerza.createFormatter();

    try {
      setReviewsLoading(true);
      const response: PaginatedApiResponse<Review> =
        await api.getProductReviews(productId, page);

      if (response.success && response.data) {
        if (page === 1) {
          setReviews(response.data);
        } else {
          // Append to existing reviews for pagination
          setReviews((prev) => [...prev, ...response.data!]);
        }
        setTotalReviewPages(response.pages);
        setReviewsPage(page);
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load reviews:", response.message);
        }
        setReviews([]);
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error loading reviews:", error);
      }
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const loadMoreReviews = () => {
    if (product && reviewsPage < totalReviewPages && !reviewsLoading) {
      loadReviews(product.id, reviewsPage + 1);
    }
  };

  // Calculate review statistics with proper validation
  const calculateReviewStats = (reviewsList: Review[]) => {
    if (!reviewsList || reviewsList.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    // Validate ratings and filter out invalid ones
    const validReviews = reviewsList.filter(
      (review) =>
        review &&
        typeof review.rating === "number" &&
        review.rating >= 1 &&
        review.rating <= 5
    );

    if (validReviews.length === 0) {
      return {
        averageRating: 0,
        totalReviews: reviewsList.length, // Keep original count for display
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }

    const totalRating = validReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / validReviews.length;

    const ratingBreakdown = validReviews.reduce(
      (acc, review) => {
        const rating = Math.floor(review.rating) as keyof typeof acc;
        if (rating >= 1 && rating <= 5) {
          acc[rating] = (acc[rating] || 0) + 1;
        }
        return acc;
      },
      { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    );

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: reviewsList.length,
      ratingBreakdown,
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-theme-secondary">Loading product...</p>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-theme-primary mb-4">
          Product Not Found
        </h1>
        <p className="text-theme-secondary mb-6">
          {error || "The product you're looking for doesn't exist."}
        </p>
        <Link
          to="/products"
          className="bg-primary hover:bg-primary-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p className="text-theme-secondary">Loading...</p>;
  }

  const images =
    product.imageNames.length > 0
      ? product.imageNames.map(
          (name) => `https://user-generated-content.komerza.com/${name}`
        )
      : ["/product-placeholder.png"];

  const reviewStats = calculateReviewStats(reviews);

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
      stock: v.stock || 0,
      stockMode: v.stockMode || 0,
    })),
    image: images[0],
    rating: reviewStats.averageRating,
    reviews: reviewStats.totalReviews,
    category: "",
  };

  // Format reviews with proper validation and fallbacks
  const formattedReviews = reviews.map((review) => {
    // Validate date
    let formattedDate = "Unknown date";
    try {
      if (review.dateCreated) {
        const date = new Date(review.dateCreated);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Invalid date:", review.dateCreated);
      }
    }

    // Validate rating
    const validRating =
      typeof review.rating === "number" &&
      review.rating >= 1 &&
      review.rating <= 5
        ? review.rating
        : 0;

    // Get the reason field directly - it's definitely there
    const comment =
      review.reason && review.reason.trim()
        ? review.reason.trim()
        : "No comment provided";

    const formatted = {
      id: review.id || Math.random().toString(),
      rating: validRating,
      comment: comment,
      author: "Customer", // Komerza doesn't provide author names for privacy
      date: formattedDate,
      reply: review.reply && review.reply.trim() ? review.reply : undefined,
    };

    return formatted;
  });

  const tabsProduct = {
    id: product.id,
    name: product.name,
    longDescription: product.description,
    features: [] as string[],
    reviewsData: {
      averageRating: reviewStats.averageRating,
      totalReviews: reviewStats.totalReviews,
      ratingBreakdown: reviewStats.ratingBreakdown,
      recentReviews: formattedReviews,
      hasMoreReviews: reviewsPage < totalReviewPages,
      loadingMoreReviews: reviewsLoading,
      onLoadMore: loadMoreReviews,
    },
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div>
        <ProductImageGallery images={images} productName={product.name} />
      </div>
      <div className="space-y-6">
        <ProductActionsWrapper product={actionProduct} />
      </div>
      <div className="lg:col-span-2 mt-16 mb-8">
        <ProductDescriptionTabs product={tabsProduct} />
      </div>
    </div>
  );
}
