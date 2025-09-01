import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { User, HelpCircle } from "lucide-react";
import { useKomerza } from "@/lib/use-komerza";

export interface Product {
  id: string;
  slug: string;
  name: string;
  game: string;
  category: string;
  basePrice: number;
  maxPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  features: string[];
  status: string;
  popular: boolean;
}

export interface SuggestedItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const SUGGESTED_ITEMS: SuggestedItem[] = [
  {
    id: "account",
    name: "Your account",
    description: "View your past orders here.",
    icon: User,
    href: "/dashboard",
  },
  {
    id: "support",
    name: "Support",
    description: "Get help and contact support.",
    icon: HelpCircle,
    href: "/dashboard/support",
  },
];

export function useSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { ready } = useKomerza();

  useEffect(() => {
    if (!ready) return;
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await globalThis.komerza.getStore();
        if (res.success && res.data) {
          const mapped: Product[] = res.data.products.map((p: any) => ({
            id: p.id,
            slug: p.slug ?? p.id,
            name: p.name,
            game: "Software",
            category: "software",
            basePrice: p.variants[0]?.cost || 0,
            maxPrice: p.variants[0]?.cost || 0,
            rating: p.rating || 4.5,
            reviews: Math.floor(Math.random() * 100) + 10,
            image: p.imageNames[0]
              ? `https://user-generated-content.komerza.com/${p.imageNames[0]}`
              : "/product-placeholder.png",
            description: p.description || "High-quality software solution",
            features: [],
            status: "In Stock",
            popular: p.isBestSeller || false,
          }));
          setProducts(mapped);
          setFilteredProducts(mapped.filter((p) => p.popular).slice(0, 3));
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to load products:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [ready]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const allItems = useMemo(
    () => [...filteredProducts.slice(0, 3), ...SUGGESTED_ITEMS],
    [filteredProducts]
  );

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
    if (!isExpanded && products.length > 0) {
      setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
    }
  };

  const closeSearch = () => {
    setIsExpanded(false);
    setSearchQuery("");
    if (products.length > 0) {
      setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
    }
    setSelectedIndex(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
    }
    setSelectedIndex(-1);
  };

  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (!isExpanded) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < allItems.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          const selectedItem: any = allItems[selectedIndex];
          if (selectedItem.href) {
            navigate(selectedItem.href);
            closeSearch();
          }
        } else if (searchQuery.trim()) {
          handleSearch(e as any);
        }
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (!isExpanded) {
          setIsExpanded(true);
        }
      }
      if (e.key === "Escape" && isExpanded) {
        closeSearch();
      }
      handleKeyNavigation(e);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, selectedIndex, allItems, searchQuery]);

  return {
    isExpanded,
    searchQuery,
    filteredProducts,
    selectedIndex,
    loading,
    inputRef,
    containerRef,
    toggleSearch,
    closeSearch,
    handleSearch,
    handleInputChange,
    handleKeyNavigation,
    setSelectedIndex,
    allItems,
  };
}

