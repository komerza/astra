// List all product IDs or slugs that must be pre-rendered for static export.
// If you navigate to /products/[slug] and the slug is NOT in this list, Next.js
// (with output: 'export') will throw: missing param in generateStaticParams.
// Add new product IDs/slugs here before building.
export const productSlugs = [
  "8df1c0d7-6763-4d3c-9fd3-b86a9ee8a6ba",
  "6f1f885e-ebeb-4cb8-8515-1e564e15b1e1", // added to fix missing param error
];

// TIP: Consider automating this by generating this file from your product source
// before running `next build`.
