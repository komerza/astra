import { ProductsHeader } from "@/components/products-header"
import { ProductPageClient } from "@/app/components/product-page-client"
import { productSlugs } from "@/lib/product-slugs"

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      <ProductsHeader />
      <main className="container mx-auto pt-24 px-4 sm:px-6">
        <ProductPageClient slug={params.slug} />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }))
}
