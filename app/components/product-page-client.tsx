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

export function ProductPageClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductReference | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(0);

  useEffect(() => {
    async function load() {
      const api: any = globalThis.komerza;
      if (!api) return;

      try {
        if (typeof api.getProduct === "function") {
          const res = await api.getProduct({ idOrSlug: slug });
          if (res?.success && res.data) {
            setProduct(res.data);
            // Load reviews for this product
            loadReviews(res.data.id, 1);
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
            }
          }
        }
      } catch (e) {
        console.warn("Failed to load product", e);
      }
    }
    load();
  }, [slug]);

  const loadReviews = async (productId: string, page: number = 1) => {
    const api: any = globalThis.komerza;
    if (!api || typeof api.getProductReviews !== "function") return;

    try {
      setReviewsLoading(true);
      const response: PaginatedApiResponse<Review> =
        await api.getProductReviews(productId, page);

      console.log("Reviews response:", response); // Debug log

      if (response.success && response.data) {
        console.log("Raw review data:", response.data); // Debug log

        if (page === 1) {
          setReviews(response.data);
        } else {
          // Append to existing reviews for pagination
          setReviews((prev) => [...prev, ...response.data!]);
        }
        setTotalReviewPages(response.pages);
        setReviewsPage(page);
      } else {
        console.warn("Failed to load reviews:", response.message);
        setReviews([]);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
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
    })),
    image: images[0],
    rating: reviewStats.averageRating,
    reviews: reviewStats.totalReviews,
    category: "",
  };

  // Format reviews with proper validation and fallbacks
  const formattedReviews = reviews.map((review) => {
    console.log("Raw review object:", review); // Debug log

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
      console.warn("Invalid date:", review.dateCreated);
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

    console.log("Formatted review:", formatted); // Debug log
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

  console.log("Final tabs product:", tabsProduct); // Debug log

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
        <Link
          href="/products"
          className="text-sm text-theme-secondary underline"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}

