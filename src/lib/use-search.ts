import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { User, HelpCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { useStoreData } from "@/lib/store-data";

export interface SuggestedItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function useSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading } = useStoreData();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const suggestedItems: SuggestedItem[] = [
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

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
    }
  }, [products]);

  const allItems = [...filteredProducts.slice(0, 3), ...suggestedItems];

  const toggleSearch = useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      if (next && products.length > 0) {
        setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
      }
      return next;
    });
  }, [products]);

  const closeSearch = useCallback(() => {
    setIsExpanded(false);
    setSearchQuery("");
    if (products.length > 0) {
      setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
    }
    setSelectedIndex(-1);
  }, [products]);

  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        closeSearch();
      }
    },
    [searchQuery, navigate, closeSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products.filter((p) => p.popular).slice(0, 3));
    }
    setSelectedIndex(-1);
  };

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      if (!isExpanded) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : prev));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && allItems[selectedIndex]) {
            const selectedItem = allItems[selectedIndex] as any;
            if (selectedItem.href) {
              navigate(selectedItem.href);
              closeSearch();
            }
          } else if (searchQuery.trim()) {
            handleSearch();
          }
          break;
      }
    },
    [isExpanded, selectedIndex, allItems, navigate, closeSearch, handleSearch, searchQuery]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (!isExpanded) setIsExpanded(true);
      }
      if (e.key === "Escape" && isExpanded) {
        closeSearch();
      }
      handleKeyNavigation(e);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, handleKeyNavigation, closeSearch]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return {
    isExpanded,
    searchQuery,
    filteredProducts,
    loading,
    selectedIndex,
    setSelectedIndex,
    toggleSearch,
    closeSearch,
    handleSearch,
    handleInputChange,
    suggestedItems,
    allItems,
    inputRef,
  };
}

