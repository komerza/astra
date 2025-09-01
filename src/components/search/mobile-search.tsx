import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/use-search";
import { SUGGESTED_ITEMS } from "@/lib/use-search";
import { SearchProductItem } from "./search-product-item";
import { SearchSuggestionItem } from "./search-suggestion-item";

interface MobileSearchProps {
  isExpanded: boolean;
  searchQuery: string;
  filteredProducts: Product[];
  selectedIndex: number;
  loading: boolean;
  toggleSearch: () => void;
  closeSearch: () => void;
  handleSearch: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  textPrimaryClass: string;
  textSecondaryClass: string;
  hoverBgClass: string;
  bgClass: string;
  borderClass: string;
}

export function MobileSearch(props: MobileSearchProps) {
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
    inputRef,
    textPrimaryClass,
    textSecondaryClass,
    hoverBgClass,
    bgClass,
    borderClass,
  } = props;

  return (
    <>
      <Button
        onClick={toggleSearch}
        className={`bg-transparent border ${borderClass} ${textPrimaryClass} ${hoverBgClass} h-8 w-8 p-0 rounded-md transition-all duration-300`}
      >
        <Search className="w-4 h-4" />
      </Button>
      {isExpanded && (
        <>
          <div
            className="fixed top-16 left-0 right-0 bottom-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeSearch}
          />
          <div
            className={`fixed inset-4 top-20 bottom-auto ${bgClass} border ${borderClass} rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300`}
          >
            <form onSubmit={handleSearch} className={`flex items-center gap-3 p-4 border-b ${borderClass}`}>
              <Search className={`w-5 h-5 ${textSecondaryClass} flex-shrink-0`} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search products..."
                className={`flex-1 bg-transparent ${textPrimaryClass} placeholder:${textSecondaryClass} border-none outline-none text-base`}
              />
              <Button type="submit" className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-3 text-sm rounded-md">
                Search
              </Button>
              <Button
                type="button"
                onClick={closeSearch}
                className="bg-transparent hover:bg-red-500/20 text-red-500 hover:text-red-400 h-8 w-8 p-0 rounded-md transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </form>
            <div className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
              {loading && (
                <div className="text-center py-8">
                  <p className={`${textSecondaryClass} text-base`}>Loading products...</p>
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
                        variant="mobile"
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
                  <p className={`${textSecondaryClass} text-base mb-4`}>
                    No products found for "{searchQuery}"
                  </p>
                  <Button onClick={handleSearch} className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 text-sm rounded-md">
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
                          variant="mobile"
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
        </>
      )}
    </>
  );
}

