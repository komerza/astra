# Utility Hooks and Shared Types

## Hooks
- `useProductData(idOrSlug)` – loads a product from Komerza by id or slug.
- `useProductReviews(productId)` – fetches and paginates product reviews.
- `useCartProductsInfo(isOpen)` – maps store products for quick cart lookup.

## Utilities
- `calculateReviewStats(reviews)` – derives rating averages and breakdowns.
- `formatReviews(apiReviews)` – normalizes Komerza review data.
- `unwrap` and `parseCartItem` – helpers for cart item identifiers.

## Shared Types
- `Product`, `ProductVariant`, `Review`, `ReviewsData` – core product structures.
- `PaginatedApiResponse<T>` – generic paginated API response shape.
