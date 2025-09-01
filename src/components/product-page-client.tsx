"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductActionsWrapper } from "@/components/product-actions-wrapper";
import { ProductDescriptionTabs } from "@/components/product-description-tabs";
import { useProductData } from "@/lib/use-product-data";
import { useProductReviews } from "@/lib/use-product-reviews";
import { calculateReviewStats } from "@/lib/review-utils";
import type { Product, ProductVariant } from "@/types/product";

export function ProductPageClient() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
  const slug = searchParams.get("id") || searchParams.get("slug");
  const { product, loading, error } = useProductData(slug);
  const {
    reviews,
    loading: reviewsLoading,
    page: reviewsPage,
    totalPages,
    loadMore,
  } = useProductReviews(product?.id || null);

  // State to track the currently selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  // Update selected variant when product loads or changes
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-theme-secondary">Loading product...</p>
      </div>
    );
  }

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
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2 rounded-md transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  // Function to get images for display
  const getDisplayImages = () => {
    // If a variant is selected and has images, use variant images
    if (
      selectedVariant &&
      selectedVariant.imageNames &&
      selectedVariant.imageNames.length > 0
    ) {
      return selectedVariant.imageNames.map(
        (name) => `https://user-generated-content.komerza.com/${name}`
      );
    }

    // Otherwise, use product images
    if (product.imageNames && product.imageNames.length > 0) {
      return product.imageNames.map(
        (name) => `https://user-generated-content.komerza.com/${name}`
      );
    }

    // Final fallback to placeholder
    return ["/product-placeholder.png"];
  };

  const images = getDisplayImages();

  const reviewStats = calculateReviewStats(reviews);

  const actionProduct: Product = {
    ...product,
    rating: reviewStats.averageRating,
    reviews: reviewStats.totalReviews,
  };

  const tabsProduct = {
    id: product.id,
    name: product.name,
    longDescription: product.description,
    features: product.features || [],
    reviewsData: {
      averageRating: reviewStats.averageRating,
      totalReviews: reviewStats.totalReviews,
      ratingBreakdown: reviewStats.ratingBreakdown,
      recentReviews: reviews,
      hasMoreReviews: reviewsPage < totalPages,
      loadingMoreReviews: reviewsLoading,
      onLoadMore: loadMore,
    },
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <div>
        <ProductImageGallery images={images} productName={product.name} />
      </div>
      <div className="space-y-6">
        <ProductActionsWrapper
          product={actionProduct}
          onVariantChange={setSelectedVariant}
        />
      </div>
      <div className="lg:col-span-2 mt-16">
        <ProductDescriptionTabs product={tabsProduct} />
      </div>
      <div className="lg:col-span-2 mt-8">
        <Link to="/products" className="text-sm text-theme-secondary underline">
          Back to Products
        </Link>
      </div>
    </div>
  );
}
