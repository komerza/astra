import type { Review } from "@/types/product";

export interface ApiReview {
  id: string;
  rating: number;
  reason: string;
  productId?: string;
  reply?: string;
  dateCreated: string;
}

export function calculateReviewStats(reviews: Review[]) {
  if (!reviews || reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }
  const validReviews = reviews.filter(
    (review) =>
      review &&
      typeof review.rating === "number" &&
      review.rating >= 1 &&
      review.rating <= 5
  );
  if (validReviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: reviews.length,
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
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  );
  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
    ratingBreakdown,
  };
}

export function formatReviews(reviews: ApiReview[]): Review[] {
  return reviews.map((review) => {
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
    } catch {}
    const validRating =
      typeof review.rating === "number" && review.rating >= 1 && review.rating <= 5
        ? review.rating
        : 0;
    const comment =
      review.reason && review.reason.trim()
        ? review.reason.trim()
        : "No comment provided";
    return {
      id: review.id || Math.random().toString(),
      rating: validRating,
      comment,
      author: "Customer",
      date: formattedDate,
      reply: review.reply && review.reply.trim() ? review.reply : undefined,
    };
  });
}
