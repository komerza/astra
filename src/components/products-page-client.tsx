"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Package,
  Search,
  Grid,
  List,
  ChevronDown,
  X
} from "lucide-react";
import { useKomerza } from "@/KomerzaProvider";
import { useStoreData } from "@/lib/store-data";

// Define missing interfaces
interface Category {
  id: string;
  name: string;
  count: number;
}

interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
}

interface SortOption {
  id: string;
  name: string;
}

let formatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

// Custom Dropdown Component
function CustomDropdown({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: (Category | PriceRange | SortOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-theme-primary border border-theme rounded-lg text-theme-primary text-sm h-10 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]/50 transition-colors duration-200"
      >
        <span>{selectedOption ? selectedOption.name : placeholder}</span>
        <ChevronDown
          className={`w-4 h-4 text-theme-secondary transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-theme-primary border border-theme rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-theme-primary text-sm hover:bg-theme-secondary transition-colors"
            >
              {option.name}
              {"count" in option && ` (${option.count})`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to get status color
function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "in stock":
      return "bg-green-500 text-white";
    case "out of stock":
      return "bg-red-500 text-white";
    case "pre-order":
      return "bg-yellow-500 text-black";
    default:
      return "bg-gray-500 text-white";
  }
}

export function ProductsPageClient() {
  const { products } = useStoreData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const { ready } = useKomerza();

  useEffect(() => {
    if (!ready) return;
    (async () => {
      formatter = await globalThis.komerza.createFormatter();
    })();
  }, [ready]);

  const categories: Category[] = [
    { id: "all", name: "All", count: products.length },
    {
      id: "software",
      name: "Software",
      count: products.filter((p) => p.category === "software").length,
    },
  ];

  const priceRanges: PriceRange[] = [
    { id: "all", name: "All", min: 0, max: Infinity },
    { id: "low", name: "Under €10", min: 0, max: 10 },
    { id: "mid", name: "€10 - €20", min: 10, max: 20 },
    { id: "high", name: "Over €20", min: 20, max: Infinity },
  ];

  const sortOptions: SortOption[] = [
    { id: "popular", name: "Most Popular" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "rating", name: "Highest Rated" },
    { id: "name", name: "Name: A to Z" },
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const selectedRange = priceRanges.find(
        (range) => range.id === selectedPriceRange
      );
      const matchesPrice =
        !selectedRange ||
        selectedRange.id === "all" ||
        (product.basePrice >= selectedRange.min &&
          product.basePrice <= selectedRange.max);

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.basePrice - b.basePrice;
        case "price-high":
          return b.basePrice - a.basePrice;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "popular":
        default:
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (products.length === 0) {
    return <p className="text-theme-secondary">Loading products...</p>;
  }

  return (
    <div className="flex gap-6">
      {/* Main Content - Left Side */}
      <div className="flex-1 space-y-6">
        {/* Mobile Filter Toggle - Only on mobile */}
        <div className="lg:hidden">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-transparent border border-theme text-theme-primary hover:bg-theme-tertiary h-10 px-4"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-theme-secondary text-sm">
            Showing {startIndex + 1}-
            {Math.min(endIndex, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </p>
          {totalPages > 1 && (
            <p className="text-theme-secondary text-sm">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Products Grid/List */}
        {currentProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                : "space-y-4"
            }
          >
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product?id=${encodeURIComponent(product.slug)}`}
              >
                {viewMode === "grid" ? (
                  // Grid View - Using EXACT same cards from home page
                  <div className="group relative w-full rounded-2xl sm:rounded-3xl border border-theme bg-theme-secondary p-2 shadow-theme hover:border-[#3B82F6]/30 transition-all duration-300">
                    <div className="relative w-full aspect-video cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl">
                      <img
                        alt={product.name}
                        className="object-cover duration-200 group-hover:scale-105"
                        src={product.image || "/product-placeholder.png"}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {product.popular && (
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-[#3B82F6] text-white border-0 text-xs">
                            Popular
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge
                          className={`border-0 text-xs ${getStatusColor(
                            product.status
                          )}`}
                        >
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-2">
                      <h3 className="flex flex-wrap items-center gap-1 text-lg sm:text-xl font-semibold text-theme-primary">
                        {product.name}
                      </h3>
                      <div className="mt-2 flex w-full flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4">
                        <Button className="w-full h-10 sm:h-12 rounded-full border border-theme bg-theme-secondary shadow-lg text-theme-primary font-normal text-sm sm:text-base px-4 hover:bg-white/15 transition-all duration-300">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          <span>Buy Now</span>
                        </Button>
                        <div className="flex flex-col items-center sm:items-end">
                          <span className="text-center sm:text-end text-xs text-theme-secondary">
                            Starting at
                          </span>
                          <span className="text-2xl sm:text-3xl font-bold text-[#3B82F6]">
                            {formatter.format(product.basePrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="group relative rounded-2xl border border-theme bg-theme-secondary shadow-theme hover:border-[#3B82F6]/30 transition-all duration-300 p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          alt={product.name}
                          className="object-cover"
                          src={product.image || "/product-placeholder.png"}
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-theme-primary truncate">
                            {product.name}
                          </h3>
                          <Badge className="bg-theme-tertiary text-theme-secondary border-0 text-xs">
                            {getGameAbbreviation(product.game)}
                          </Badge>
                          {product.popular && (
                            <Badge className="bg-[#3B82F6] text-white border-0 text-xs">
                              Popular
                            </Badge>
                          )}
                          <Badge
                            className={`border-0 text-xs ${getStatusColor(
                              product.status
                            )}`}
                          >
                            {product.status}
                          </Badge>
                        </div>
                        <p className="text-theme-secondary text-sm mb-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating)
                                      ? "text-[#3B82F6] fill-[#3B82F6]"
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-theme-primary text-sm">
                              {product.rating}
                            </span>
                            <span className="text-theme-secondary text-xs">
                              ({product.reviews})
                            </span>
                          </div>
                          <div className="text-lg font-bold text-[#3B82F6]">
                            €{product.basePrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 text-sm flex-shrink-0">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : null}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 p-0 text-sm ${
                      currentPage === page
                        ? "bg-[#3B82F6] text-white"
                        : "bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="bg-transparent border border-theme text-theme-primary hover:bg-theme-secondary h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Empty State */}
        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-theme-secondary border border-theme rounded-2xl p-8 max-w-md mx-auto">
              <Package className="w-12 h-12 text-theme-secondary mx-auto mb-4" />
              <h3 className="text-theme-primary text-lg font-medium mb-2">
                No products found
              </h3>
              <p className="text-theme-secondary text-sm mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedPriceRange("all");
                  setCurrentPage(1);
                }}
                className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 text-sm"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Search and Filters */}
      {/* Mobile: Overlay panel, Desktop: Sidebar */}
      <div
        className={`
        ${
          showFilters
            ? "lg:relative lg:w-80 fixed top-16 left-0 right-0 bottom-0 z-50 lg:z-auto bg-black/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none"
            : "hidden lg:block lg:w-80"
        }
      `}
      >
        {/* Mobile backdrop - only visible on mobile when filters are shown */}
        {showFilters && (
          <div
            className="absolute inset-0 lg:hidden"
            onClick={() => setShowFilters(false)}
          />
        )}

        {/* Filter panel */}
        <div
          className={`
          lg:space-y-6 
          ${
            showFilters
              ? "absolute right-0 top-0 h-full w-80 bg-theme-primary border-l border-theme shadow-2xl p-4 space-y-6 overflow-y-auto lg:relative lg:w-auto lg:h-auto lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0"
              : "space-y-6"
          }
        `}
        >
          {/* Close button - only on mobile */}
          {showFilters && (
            <div className="flex items-center justify-between lg:hidden mb-4">
              <h2 className="text-theme-primary text-lg font-semibold">
                Filters
              </h2>
              <Button
                onClick={() => setShowFilters(false)}
                className="bg-transparent hover:bg-theme-secondary text-theme-primary h-8 w-8 p-0 rounded-md"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Search Box */}
          <div className="bg-theme-secondary border border-theme rounded-2xl p-4 shadow-theme">
            <h3 className="text-theme-primary font-medium mb-4">
              Search Products
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 bg-theme-primary border border-theme rounded-lg text-theme-primary placeholder:text-theme-secondary h-10 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6]/50 transition-colors duration-200"
              />
            </div>
          </div>

          {/* View Options */}
          <div className="bg-theme-secondary border border-theme rounded-2xl p-4 shadow-theme">
            <h3 className="text-theme-primary font-medium mb-4">
              View Options
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode("grid")}
                className={`flex-1 h-10 p-0 ${
                  viewMode === "grid"
                    ? "bg-[#3B82F6] text-white"
                    : "bg-transparent border border-theme text-theme-primary hover:bg-theme-tertiary"
                }`}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                className={`flex-1 h-10 p-0 ${
                  viewMode === "list"
                    ? "bg-[#3B82F6] text-white"
                    : "bg-transparent border border-theme text-theme-primary hover:bg-theme-tertiary"
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-theme-secondary border border-theme rounded-2xl p-4 shadow-theme">
            <h3 className="text-theme-primary font-medium mb-4">Filters</h3>
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-theme-primary text-sm font-medium mb-2">
                  Category
                </label>
                <CustomDropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Select category"
                />
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-theme-primary text-sm font-medium mb-2">
                  Price Range
                </label>
                <CustomDropdown
                  options={priceRanges}
                  value={selectedPriceRange}
                  onChange={setSelectedPriceRange}
                  placeholder="Select price range"
                />
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-theme-primary text-sm font-medium mb-2">
                  Sort By
                </label>
                <CustomDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by"
                />
              </div>

              {/* Clear Filters */}
              {(searchQuery ||
                selectedCategory !== "all" ||
                selectedPriceRange !== "all") && (
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedPriceRange("all");
                    setCurrentPage(1);
                  }}
                  className="w-full bg-transparent text-[#3B82F6] hover:bg-[#3B82F6]/10 h-8 px-3 text-sm border border-[#3B82F6]/30"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
