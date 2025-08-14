"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { Search, X, ArrowRight, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Mock product data for search results - top 3 selling products
const searchProducts = [
  {
    id: "crusader",
    name: "Crusader",
    description: "$4.99 to $14.99 • ⚫ In stock",
    image: "/product-placeholder.png",
    href: "/products/crusader",
  },
  {
    id: "onyx-full",
    name: "Onyx Full (Unlock All)",
    description: "$5.99 to $15.99 • ⚫ In stock",
    image: "/product-placeholder.png",
    href: "/products/onyx-full",
  },
  {
    id: "onyx-lite",
    name: "Onyx Lite (Unlock All)",
    description: "$4.99 to $7.99 • ⚫ In stock",
    image: "/product-placeholder.png",
    href: "/products/onyx-lite",
  },
]

const suggestedItems = [
  {
    id: "account",
    name: "Your account",
    description: "View your past orders here.",
    icon: User,
    href: "#",
  },
  {
    id: "support",
    name: "Support",
    description: "Get help and contact support.",
    icon: HelpCircle,
    href: "#",
  },
]

export function SearchButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(searchProducts)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Theme detection
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
    }
  }, [])

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Get all selectable items (products + suggested items)
  const allItems = [...filteredProducts.slice(0, 3), ...suggestedItems]

  const toggleSearch = () => {
    setIsExpanded(!isExpanded)
  }

  const closeSearch = () => {
    setIsExpanded(false)
    setSearchQuery("")
    setFilteredProducts(searchProducts)
    setSelectedIndex(-1)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Filter products based on search query
      const filtered = searchProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredProducts(filtered)
      setSelectedIndex(-1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    // Filter products in real-time
    if (query.trim()) {
      const filtered = searchProducts.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts(searchProducts)
    }
    setSelectedIndex(-1)
  }

  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (!isExpanded) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && allItems[selectedIndex]) {
          const selectedItem = allItems[selectedIndex]
          // Navigate to the selected item
          if (selectedItem.href) {
            window.location.href = selectedItem.href
            closeSearch()
          }
        }
        break
    }
  }

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  // Handle keyboard shortcuts and navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        if (!isExpanded) {
          setIsExpanded(true)
        }
      }

      // Escape to close search
      if (e.key === "Escape" && isExpanded) {
        closeSearch()
      }

      // Arrow navigation and Enter
      handleKeyNavigation(e)
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isExpanded, selectedIndex, allItems])

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <Button className="bg-transparent border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 h-8 w-8 p-0 rounded-md transition-all duration-300">
        <Search className="w-4 h-4" />
      </Button>
    )
  }

  // Theme-aware classes
  const isDark = theme === "dark"
  const bgClass = isDark ? "bg-[#050505]" : "bg-white"
  const borderClass = isDark ? "border-white/20" : "border-gray-300"
  const textPrimaryClass = isDark ? "text-white" : "text-gray-900"
  const textSecondaryClass = isDark ? "text-[#808080]" : "text-gray-600"
  const hoverBgClass = isDark ? "hover:bg-white/10" : "hover:bg-gray-100"
  const inputBgClass = isDark ? "bg-[#050505]" : "bg-white"

  // Mobile Modal Search
  if (isMobile) {
    return (
      <>
        {/* Search Icon Button */}
        <Button
          onClick={toggleSearch}
          className={`bg-transparent border ${borderClass} ${textPrimaryClass} ${hoverBgClass} h-8 w-8 p-0 rounded-md transition-all duration-300`}
        >
          <Search className="w-4 h-4" />
        </Button>

        {/* Mobile Search Modal */}
        {isExpanded && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={closeSearch} />

            {/* Modal */}
            <div
              className={`fixed inset-4 top-20 bottom-auto ${bgClass} border ${borderClass} rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300`}
            >
              {/* Header */}
              <div className={`flex items-center gap-3 p-4 border-b ${borderClass}`}>
                <Search className={`w-5 h-5 ${textSecondaryClass} flex-shrink-0`} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                  className={`flex-1 bg-transparent ${textPrimaryClass} placeholder:${textSecondaryClass} border-none outline-none text-base`}
                />
                <Button
                  onClick={closeSearch}
                  className="bg-transparent hover:bg-red-500/20 text-red-500 hover:text-red-400 h-8 w-8 p-0 rounded-md transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-6 overflow-y-auto max-h-[60vh]">
                {/* Products Section */}
                {filteredProducts.length > 0 && (
                  <div>
                    <h3 className={`text-xs font-medium ${textSecondaryClass} uppercase tracking-wider mb-3`}>
                      Top Products
                    </h3>
                    <div className="space-y-2">
                      {filteredProducts.slice(0, 3).map((product, index) => (
                        <Link
                          key={product.id}
                          href={product.href}
                          onClick={closeSearch}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-h-[44px] ${
                            selectedIndex === index
                              ? "bg-blue-500/20 border border-blue-500/50"
                              : `${hoverBgClass} border border-transparent`
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={28}
                              height={28}
                              className="w-7 h-7 object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`${textPrimaryClass} text-base font-medium truncate`}>{product.name}</h4>
                            <p className={`${textSecondaryClass} text-sm truncate`}>{product.description}</p>
                          </div>
                          <ArrowRight className={`w-5 h-5 ${textSecondaryClass} flex-shrink-0`} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {searchQuery && filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <p className={`${textSecondaryClass} text-base`}>No products found for "{searchQuery}"</p>
                  </div>
                )}

                {/* Suggested Section */}
                <div>
                  <h3 className={`text-xs font-medium ${textSecondaryClass} uppercase tracking-wider mb-3`}>
                    Quick Access
                  </h3>
                  <div className="space-y-2">
                    {suggestedItems.map((item, index) => {
                      const IconComponent = item.icon
                      const itemIndex = filteredProducts.slice(0, 3).length + index
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={closeSearch}
                          className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-h-[44px] ${
                            selectedIndex === itemIndex
                              ? "bg-blue-500/20 border border-blue-500/50"
                              : `${hoverBgClass} border border-transparent`
                          }`}
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-blue-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`${textPrimaryClass} text-base font-medium truncate`}>{item.name}</h4>
                            <p className={`${textSecondaryClass} text-sm truncate`}>{item.description}</p>
                          </div>
                          <ArrowRight className={`w-5 h-5 ${textSecondaryClass} flex-shrink-0`} />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  // Desktop Search (existing implementation)
  return (
    <div ref={containerRef} className="relative flex items-center">
      {/* Search Input */}
      <div
        className={`absolute right-0 top-0 h-8 ${inputBgClass} border ${borderClass} rounded-md backdrop-blur-md transition-all duration-300 ease-out overflow-hidden ${
          isExpanded ? "w-80 opacity-100" : "w-0 opacity-0"
        }`}
        style={{
          transformOrigin: "right center",
        }}
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
            <div
              className={`shortcut -mr-1 hidden justify-end gap-0.5 whitespace-nowrap ${textSecondaryClass} text-xs md:flex`}
            >
              <kbd
                className={`flex h-5 min-w-5 items-center justify-center rounded border ${borderClass} ${isDark ? "bg-white/5" : "bg-gray-100"} px-1`}
              >
                Esc
              </kbd>
            </div>
          </div>
        </form>
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && (
        <div
          className={`absolute top-10 right-0 w-80 ${bgClass} border ${borderClass} rounded-lg shadow-2xl backdrop-blur-md z-50 overflow-hidden`}
        >
          {/* Dropdown Header with Close Button */}
          <div className="relative p-4 pb-0">
            <Button
              onClick={closeSearch}
              className="absolute top-3 right-3 bg-transparent hover:bg-red-500/20 text-red-500 hover:text-red-400 h-6 w-6 p-0 rounded-md transition-all duration-300 z-10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="px-4 pb-4 space-y-4">
            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <div>
                <h3 className={`text-xs font-medium ${textSecondaryClass} uppercase tracking-wider mb-3`}>
                  Top Products
                </h3>
                <div className="space-y-2">
                  {filteredProducts.slice(0, 3).map((product, index) => (
                    <Link
                      key={product.id}
                      href={product.href}
                      onClick={closeSearch}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group ${
                        selectedIndex === index
                          ? "bg-blue-500/20 border border-blue-500/50"
                          : `${hoverBgClass} border border-transparent`
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`${textPrimaryClass} text-sm font-medium truncate`}>{product.name}</h4>
                        <p className={`${textSecondaryClass} text-xs truncate`}>{product.description}</p>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 ${textSecondaryClass} group-hover:${textPrimaryClass} transition-colors duration-200 flex-shrink-0`}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchQuery && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className={`${textSecondaryClass} text-sm`}>No products found for "{searchQuery}"</p>
              </div>
            )}

            {/* Suggested Section */}
            <div>
              <h3 className={`text-xs font-medium ${textSecondaryClass} uppercase tracking-wider mb-3`}>
                Quick Access
              </h3>
              <div className="space-y-2">
                {suggestedItems.map((item, index) => {
                  const IconComponent = item.icon
                  const itemIndex = filteredProducts.slice(0, 3).length + index
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={closeSearch}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group ${
                        selectedIndex === itemIndex
                          ? "bg-blue-500/20 border border-blue-500/50"
                          : `${hoverBgClass} border border-transparent`
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`${textPrimaryClass} text-sm font-medium truncate`}>{item.name}</h4>
                        <p className={`${textSecondaryClass} text-xs truncate`}>{item.description}</p>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 ${textSecondaryClass} group-hover:${textPrimaryClass} transition-colors duration-200 flex-shrink-0`}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Icon Button */}
      <Button
        onClick={toggleSearch}
        className={`bg-transparent border ${borderClass} ${textPrimaryClass} ${hoverBgClass} h-8 w-8 p-0 rounded-md flex items-center justify-center transition-all duration-300 relative z-10 ${
          isExpanded ? `${hoverBgClass} opacity-0 pointer-events-none` : "opacity-100"
        }`}
      >
        <Search className="w-4 h-4" />
      </Button>
    </div>
  )
}
