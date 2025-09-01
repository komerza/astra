import { ProductPageClient } from "@/components/product-page-client";
import { PageLayout } from "@/components/page-layout";

export default function ProductPage() {
  return (
    <PageLayout>
      <main className="container mx-auto pt-24 px-4 sm:px-6">
        <ProductPageClient />
      </main>
    </PageLayout>
  );
}
