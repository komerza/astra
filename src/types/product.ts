export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock?: number;
  stockMode?: number; // 0 = Calculated, 1 = Ignored, 2 = Fixed
  imageNames?: string[]; // Array of image names for this variant
}

export interface Review {
  id: string;
  author?: string;
  rating: number;
  date?: string;
  comment?: string;
  reply?: string;
}

export interface ReviewsData {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recentReviews: Review[];
  hasMoreReviews?: boolean;
  loadingMoreReviews?: boolean;
  onLoadMore?: () => void;
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  game?: string;
  category?: string;
  basePrice?: number;
  maxPrice?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  imageNames?: string[]; // Array of image names for the product
  description?: string;
  longDescription?: string;
  features?: string[];
  status?: string;
  popular?: boolean;
  variants?: ProductVariant[];
  reviewsData?: ReviewsData;
}
