import Link from "next/link"
import { ArrowLeft, Home, Package, HelpCircle, LayoutDashboard, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CartButton } from "@/app/components/cart-button"
import { MobileNav } from "@/app/components/mobile-nav"
import { SearchButton } from "@/app/components/search-button"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { ProductsPageClient } from "@/app/components/products-page-client"

// All products data
const allProducts = [
  {
    id: "premium-code-editor",
    name: "Premium Code Editor",
    game: "Software Development",
    category: "Professional",
    basePrice: 4.99,
    maxPrice: 14.99,
    rating: 4.8,
    reviews: 1247,
    image: "/product-placeholder.png",
    description: "Professional code editor with advanced syntax highlighting and debugging tools",
    features: ["Syntax Highlighting", "Code Completion", "Debugging Tools", "Git Integration"],
    status: "In Stock",
    popular: true,
  },
  {
    id: "ui-template-pack",
    name: "UI Template Pack",
    game: "Web Design",
    category: "Creative",
    basePrice: 4.99,
    maxPrice: 7.99,
    rating: 4.6,
    reviews: 892,
    image: "/product-placeholder.png",
    description: "Modern UI templates and components for web applications",
    features: ["Responsive Design", "CSS Frameworks", "Mobile Ready", "Cross-browser"],
    status: "In Stock",
    popular: true,
  },
  {
    id: "business-suite-pro",
    name: "Business Suite Pro",
    game: "Business Software",
    category: "Enterprise",
    basePrice: 5.99,
    maxPrice: 15.99,
    rating: 4.9,
    reviews: 2156,
    image: "/product-placeholder.png",
    description: "Complete business management software with CRM and analytics",
    features: ["Project Management", "CRM System", "Financial Reports", "Team Collaboration"],
    status: "In Stock",
    popular: true,
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    game: "Data Analytics",
    category: "Professional",
    basePrice: 6.99,
    maxPrice: 12.99,
    rating: 4.5,
    reviews: 634,
    image: "/product-placeholder.png",
    description: "Advanced analytics dashboard for business intelligence",
    features: ["Data Visualization", "Custom Reports", "Real-time Analytics", "API Integration"],
    status: "In Stock",
    popular: false,
  },
  {
    id: "mobile-app-kit",
    name: "Mobile App Development Kit",
    game: "Mobile Development",
    category: "Professional",
    basePrice: 8.99,
    maxPrice: 18.99,
    rating: 4.7,
    reviews: 445,
    image: "/product-placeholder.png",
    description: "Complete mobile app development toolkit with UI components",
    features: ["Native Components", "Cross Platform", "UI Libraries", "Documentation"],
    status: "In Stock",
    popular: false,
  },
  {
    id: "ecommerce-platform",
    name: "E-commerce Platform",
    game: "E-commerce",
    category: "Enterprise",
    basePrice: 12.99,
    maxPrice: 24.99,
    rating: 4.8,
    reviews: 789,
    image: "/product-placeholder.png",
    description: "Complete e-commerce platform with payment processing and inventory management",
    features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Customer Portal"],
    status: "In Stock",
    popular: false,
  },
  {
    id: "wordpress-themes",
    name: "WordPress Theme Collection",
    game: "Website Building",
    category: "Creative",
    basePrice: 7.99,
    maxPrice: 16.99,
    rating: 4.4,
    reviews: 523,
    image: "/product-placeholder.png",
    description: "Professional WordPress themes for business and portfolio websites",
    features: ["Responsive Design", "SEO Optimized", "WooCommerce Ready", "Easy Customization"],
    status: "Updating",
    popular: false,
  },
  {
    id: "graphic-design-tools",
    name: "Graphic Design Toolkit",
    game: "Design Software",
    category: "Creative",
    basePrice: 5.99,
    maxPrice: 11.99,
    rating: 4.3,
    reviews: 367,
    image: "/product-placeholder.png",
    description: "Complete graphic design toolkit with templates and assets",
    features: ["Design Templates", "Vector Graphics", "Photo Editing", "Brand Assets"],
    status: "In Stock",
    popular: false,
  },
]

const categories = [
  { id: "all", name: "All Products", count: allProducts.length },
  {
    id: "software-development",
    name: "Software Development",
    count: allProducts.filter((p) => p.game === "Software Development").length,
  },
  { id: "web-design", name: "Web Design", count: allProducts.filter((p) => p.game === "Web Design").length },
  { id: "business-software", name: "Business Software", count: allProducts.filter((p) => p.game === "Business Software").length },
  {
    id: "data-analytics",
    name: "Data Analytics", 
    count: allProducts.filter((p) => p.game === "Data Analytics").length,
  },
  { id: "mobile-development", name: "Mobile Development", count: allProducts.filter((p) => p.game === "Mobile Development").length },
  { id: "e-commerce", name: "E-commerce", count: allProducts.filter((p) => p.game === "E-commerce").length },
  { id: "website-building", name: "Website Building", count: allProducts.filter((p) => p.game === "Website Building").length },
  { id: "design-software", name: "Design Software", count: allProducts.filter((p) => p.game === "Design Software").length },
]

const priceRanges = [
  { id: "all", name: "All Prices", min: 0, max: Number.POSITIVE_INFINITY },
  { id: "under-10", name: "Under €10", min: 0, max: 9.99 },
  { id: "10-15", name: "€10 - €15", min: 10, max: 15.99 },
  { id: "15-20", name: "€15 - €20", min: 15, max: 20.99 },
  { id: "over-20", name: "Over €20", min: 20, max: Number.POSITIVE_INFINITY },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      {/* Glowing effects */}
      <div className="absolute top-20 left-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-[#3B82F6] rounded-full blur-3xl opacity-10"></div>

      {/* Header */}
      <header className="h-16 flex items-center justify-between container mx-auto top-0 absolute inset-x-0 z-50 px-4 sm:px-6">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image src="/kimera-logo.svg" alt="Komerza" width={138} height={55} className="h-8 sm:h-9 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center gap-4 hidden md:flex">
            <Link
              href="/"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Home className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Home</span>
            </Link>
            <Link
              href="/products"
              className="text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-[#3B82F6]/10 px-2.5 py-1.5 transition-colors duration-300"
            >
              <Package className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Products</span>
            </Link>
            <Link
              href="/status"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <Activity className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Status</span>
            </Link>
            <Link
              href="#"
              className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
            >
              <HelpCircle className="w-[18px] h-[18px]" />
              <span className="text-sm font-normal tracking-20-smaller">Support</span>
            </Link>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <SearchButton />
          <CartButton />
          <Link href="/dashboard">
            <Button className="bg-[#3B82F6] text-white hover:bg-[#2563EB] h-8 px-4 py-2 rounded-md flex items-center gap-2 text-sm tracking-20-smaller transition-all duration-300 font-normal">
              <LayoutDashboard className="w-[18px] h-[18px]" />
              <span>Dashboard</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-secondary hover:text-[#3B82F6] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-20-smaller">Back to Home</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl heading-semibold text-theme-primary mb-4">Browse All Products</h1>
            <p className="text-theme-secondary text-sm sm:text-base max-w-2xl mx-auto">
              Discover our complete collection of premium digital products and software solutions.
            </p>
          </div>

          {/* Products Page Client Component */}
          <ProductsPageClient products={allProducts} categories={categories} priceRanges={priceRanges} />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-theme bg-theme-primary">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image src="/kimera-logo.svg" alt="Komerza" width={120} height={48} className="h-6 sm:h-8 w-auto" />
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 mb-4 md:mb-0">
              <Link
                href="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-theme-secondary hover:text-[#3B82F6] text-sm tracking-20-smaller transition-colors duration-300"
              >
                Terms
              </Link>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-theme">
            <p className="text-center text-xs text-theme-secondary tracking-20-smaller">
              © 2025 Komerza. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
