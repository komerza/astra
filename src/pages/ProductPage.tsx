import { ProductsHeader } from "@/components/products-header";
import { ProductPageClient } from "@/components/product-page-client";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      <ProductsHeader />
      <main className="container mx-auto pt-24 px-4 sm:px-6">
        <ProductPageClient />
      </main>
    </div>
  );
}
