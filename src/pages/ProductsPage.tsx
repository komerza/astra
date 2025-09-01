import { ProductsPageClient } from "@/components/products-page-client";
import { PageLayout } from "@/components/page-layout";

export default function ProductsPage() {
  return (
    <PageLayout>
      <main className="container mx-auto pt-24 px-4 sm:px-6">
        <ProductsPageClient />
      </main>
    </PageLayout>
  );
}
