import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/use-search";
import { SUGGESTED_ITEMS } from "@/lib/use-search";
import { SearchProductItem } from "./search-product-item";
import { SearchSuggestionItem } from "./search-suggestion-item";

interface DesktopSearchProps {
  isExpanded: boolean;
  searchQuery: string;
  filteredProducts: Product[];
  selectedIndex: number;
  loading: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  handleSearch: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  textPrimaryClass: string;
  textSecondaryClass: string;
  hoverBgClass: string;
  bgClass: string;
  borderClass: string;
  inputBgClass: string;
  kbdBgClass: string;
}

export function DesktopSearch(props: DesktopSearchProps) {
  const {
    isExpanded,
    searchQuery,
    filteredProducts,
    selectedIndex,
    loading,
    toggleSearch,
    closeSearch,
    handleSearch,
    handleInputChange,
    containerRef,
    inputRef,
    textPrimaryClass,
    textSecondaryClass,
    hoverBgClass,
    bgClass,
    borderClass,
    inputBgClass,
    kbdBgClass,
  } = props;

  return (
    <div ref={containerRef} className="relative flex items-center">
      <div
        className={`absolute right-0 top-0 h-8 ${inputBgClass} border ${borderClass} rounded-md backdrop-blur-md transition-all duration-300 ease-out overflow-hidden ${
          isExpanded ? "w-80 opacity-100" : "w-0 opacity-0"
        }`}
        style={{ transformOrigin: "right center" }}
      >
        <form onSubmit={handleSearch} className="h-full flex items-center">
          <div className="flex items-center w-full h-full px-3">
            <Search className={`w-4 h-4 ${textSecondaryClass} flex-shrink-0`} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search products..."
              className={`flex-1 bg-transparent ${textPrimaryClass} text-sm placeholder:${textSecondaryClass} border-none outline-none ml-2 min-w-0`}
            />
            <div className={`shortcut -mr-1 hidden justify-end gap-0.5 whitespace-nowrap ${textSecondaryClass} text-xs md:flex`}>
              <kbd className={`flex h-5 min-w-5 items-center justify-center rounded border ${borderClass} ${kbdBgClass} px-1`}>
                Esc
              </kbd>
            </div>
          </div>
        </form>
      </div>
      {isExpanded && (
        <div className={`absolute top-10 right-0 w-80 ${bgClass} border ${borderClass} rounded-lg shadow-2xl backdrop-blur-md z-50 overflow-hidden`}>
          <div className="relative p-4 pb-0">
            <Button
              onClick={closeSearch}
              className="absolute top-3 right-3 bg-transparent hover:bg-red-500/20 text-red-500 hover:text-red-400 h-6 w-6 p-0 rounded-md transition-all duration-300 z-10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="px-4 pb-4 space-y-4">
            {loading && (
              <div className="text-center py-8">
                <p className={`${textSecondaryClass} text-sm`}>Loading products...</p>
              </div>
            )}
            {!loading && filteredProducts.length > 0 && (
              <div>
                <h3 className={`text-xs font-medium ${textSecondaryClass} uppercase tracking-wider mb-3`}>
                  {searchQuery ? "Search Results" : "Popular Products"}
                </h3>
                <div className="space-y-2">
                  {filteredProducts.map((product, index) => (
                    <SearchProductItem
                      key={product.id}
                      product={product}
                      selected={selectedIndex === index}
                      onClick={closeSearch}
                      variant="desktop"
                      textPrimaryClass={textPrimaryClass}
                      textSecondaryClass={textSecondaryClass}
                      hoverBgClass={hoverBgClass}
                    />
                  ))}
                </div>
              </div>
            )}
            {!loading && searchQuery && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className={`${textSecondaryClass} text-sm mb-4`}>
                  No products found for "{searchQuery}"
                </p>
                <Button onClick={handleSearch} className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-6 px-3 text-xs rounded-md">
                  Search all products
                </Button>
              </div>
            )}
            {!loading && (
              <div>
                <h3 className={`text-xs font-medium ${textSecondaryClass} uppercase tracking-wider mb-3`}>
                  Quick Access
                </h3>
                <div className="space-y-2">
                  {SUGGESTED_ITEMS.map((item, index) => {
                    const itemIndex = filteredProducts.length + index;
                    return (
                      <SearchSuggestionItem
                        key={item.id}
                        item={item}
                        selected={selectedIndex === itemIndex}
                        onClick={closeSearch}
                        variant="desktop"
                        textPrimaryClass={textPrimaryClass}
                        textSecondaryClass={textSecondaryClass}
                        hoverBgClass={hoverBgClass}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Button
        onClick={toggleSearch}
        className={`bg-transparent border ${borderClass} ${textPrimaryClass} ${hoverBgClass} h-8 w-8 p-0 rounded-md flex items-center justify-center transition-all duration-300 relative z-10 ${
          isExpanded ? `${hoverBgClass} opacity-0 pointer-events-none` : "opacity-100"
        }`}
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}

