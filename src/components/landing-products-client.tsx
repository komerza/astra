"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, SmilePlus } from "lucide-react";
interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

let formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export function LandingProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function load() {
      const res = await (globalThis as any).komerza.getStore();
      formatter = await (globalThis as any).komerza.createFormatter();
      if (res.success && res.data) {
        const mapped: Product[] = res.data.products
          .slice(0, 3)
          .map((p: any) => ({
            id: p.id,
            slug: p.slug ?? p.id,
            name: p.name,
            description: p.description,
            price: p.variants[0]?.cost || 0,
            image: p.imageNames[0]
              ? `https://user-generated-content.komerza.com/${p.imageNames[0]}`
              : "/product-placeholder.png",
          }));
        setProducts(mapped);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto">
      {products.map((p) => (
        <div key={p.id} className="w-full sm:w-80 lg:w-96">
          <Link to={`/product?id=${encodeURIComponent(p.slug)}`}>
            <div className="group relative w-full rounded-2xl sm:rounded-3xl border border-theme bg-theme-secondary p-2 shadow-theme hover:border-primary-500 transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full aspect-video cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl">
                <img
                  alt={p.name}
                  className="object-cover duration-200 group-hover:scale-105"
                  src={p.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 384px"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-white border-0 text-xs">
                    Best Seller
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-2">
                <h3 className="flex flex-wrap items-center gap-1 text-lg sm:text-xl font-semibold text-theme-primary">
                  <span className="line-clamp-1">{p.name}</span>
                  <span className="ml-1 rounded-md border border-theme bg-theme-secondary px-2 py-0.5 text-xs shadow-md flex-shrink-0">
                    Software
                  </span>
                </h3>
                <p className="text-theme-secondary text-sm line-clamp-3 flex-grow">
                  {p.description}
                </p>
                <div className="flex w-full flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4 mt-3">
                  <Button className="w-full h-10 sm:h-12 rounded-full border border-theme bg-theme-secondary shadow-lg text-theme-primary font-normal text-sm sm:text-base px-4 hover:bg-gray-200 dark:hover:bg-white/15 transition-all duration-300">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    <span>Buy Now</span>
                  </Button>
                  <div className="flex flex-col items-center sm:items-end flex-shrink-0">
                    <span className="text-center sm:text-end text-xs text-theme-secondary">
                      Starting at
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      {formatter.format(p.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
