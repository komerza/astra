import { Navbar } from "@/components/navbar";
import { ProductsPageClient } from "@/components/products-page-client";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      <Navbar />
      <main className="container mx-auto pt-24 px-4 sm:px-6">
        <ProductsPageClient />
      </main>
    </div>
  );
}
