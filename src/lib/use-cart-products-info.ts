import { useEffect, useState } from "react";
import { useStoreData } from "@/lib/store-data";

interface ProductInfo {
  id: string;
  name: string;
  variants: Array<{ id: string; name: string; cost: number }>;
}

export function useCartProductsInfo(isOpen: boolean) {
  const { products } = useStoreData();
  const [productsInfo, setProductsInfo] = useState<Record<string, ProductInfo>>({});

  useEffect(() => {
    if (!isOpen || products.length === 0) return;
    const productMap: Record<string, ProductInfo> = {};
    products.forEach((product) => {
      productMap[product.id] = {
        id: product.id,
        name: product.name,
        variants: (product.variants || []).map((v) => ({
          id: v.id,
          name: v.name,
          cost: v.price,
        })),
      };
    });
    setProductsInfo(productMap);
  }, [isOpen, products]);

  return productsInfo;
}
