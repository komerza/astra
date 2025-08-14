import Link from "next/link"
import {
  ArrowLeft,
  Home,
  Package,
  HelpCircle,
  LayoutDashboard,
  ShoppingCart,
  Shield,
  Zap,
  Users,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { notFound } from "next/navigation"
import { CartButton } from "@/app/components/cart-button"
import { ProductActionsWrapper } from "@/app/components/product-actions-wrapper"
import { MobileNav } from "@/app/components/mobile-nav"
import { SearchButton } from "@/app/components/search-button"
import { ProductImageGallery } from "@/app/components/product-image-gallery"
import { ProductDescriptionTabs } from "@/app/components/product-description-tabs"
import { ThemeToggle } from "@/app/components/theme-toggle"

// Product data with variants and multiple images
const products = {
  "premium-code-editor": {
    id: "premium-code-editor",
    name: "Premium Code Editor",
    game: "Software",
    basePrice: 29.99,
    variants: [
      { id: "basic", name: "Basic License", price: 29.99, description: "1 year license" },
      { id: "pro", name: "Pro License", price: 49.99, description: "3 years license + premium plugins" },
      { id: "enterprise", name: "Enterprise License", price: 99.99, description: "Lifetime license + priority support" },
    ],
    longDescription:
      "A professional code editor designed for developers who demand the best. With advanced syntax highlighting, intelligent code completion, and powerful debugging tools, this editor will transform your development workflow.",
    features: [
      "Advanced syntax highlighting for 100+ languages",
      "Intelligent code completion and suggestions",
      "Integrated debugging and testing tools",
      "Customizable themes and layouts",
      "Git integration and version control",
      "Plugin marketplace with 1000+ extensions",
    ],
    images: [
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
    ],
    rating: 4.7,
    reviews: 834,
    category: "Professional",
    reviewsData: {
      averageRating: 4.7,
      totalReviews: 834,
      ratingBreakdown: {
        5: 567,
        4: 178,
        3: 67,
        2: 15,
        1: 7,
      },
      recentReviews: [
        {
          id: 1,
          author: "DevMaster",
          rating: 5,
          date: "2024-01-28",
          title: "Best editor I've used",
          content: "This editor has everything I need for professional development. The syntax highlighting is excellent and the plugin system is very robust.",
          verified: true,
        },
        {
          id: 2,
          author: "CodeNinja",
          rating: 5,
          date: "2024-01-25",
          title: "Perfect for team development",
          content: "Great collaboration features and the Git integration works flawlessly. Highly recommended for any development team.",
          verified: true,
        },
        {
          id: 3,
          author: "WebDev2024",
          rating: 4,
          date: "2024-01-22",
          title: "Solid choice",
          content: "Very good editor with lots of features. The learning curve is reasonable and support is responsive.",
          verified: true,
        },
      ],
    },
  },
  "ui-template-pack": {
    id: "ui-template-pack",
    name: "UI Template Pack",
    game: "Templates",
    basePrice: 19.99,
    variants: [
      { id: "starter", name: "Starter Pack", price: 19.99, description: "10 premium templates" },
      { id: "pro", name: "Pro Pack", price: 39.99, description: "50 templates + source files" },
      { id: "ultimate", name: "Ultimate Pack", price: 69.99, description: "100+ templates + lifetime updates" },
    ],
    longDescription:
      "A comprehensive collection of modern UI templates and components. Perfect for web designers and developers who want to create stunning websites and applications quickly and efficiently.",
    features: [
      "100+ responsive HTML templates",
      "Modern CSS frameworks included",
      "Mobile-first design approach",
      "Cross-browser compatibility",
      "Source files and documentation",
      "Regular template updates",
    ],
    images: [
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
    ],
    rating: 4.5,
    reviews: 1156,
    category: "Design",
    reviewsData: {
      averageRating: 4.5,
      totalReviews: 1156,
      ratingBreakdown: {
        5: 678,
        4: 289,
        3: 134,
        2: 35,
        1: 20,
      },
      recentReviews: [
        {
          id: 1,
          author: "DesignPro",
          rating: 5,
          date: "2024-01-29",
          title: "Amazing template collection",
          content: "The quality of these templates is outstanding. They're modern, responsive, and easy to customize. Saved me weeks of work!",
          verified: true,
        },
        {
          id: 2,
          author: "WebStudio",
          rating: 4,
          date: "2024-01-26",
          title: "Great for client projects",
          content: "We use these templates as starting points for client projects. The variety is excellent and they're well-coded.",
          verified: true,
        },
        {
          id: 3,
          author: "FreelanceDesigner",
          rating: 5,
          date: "2024-01-23",
          title: "Perfect for freelancers",
          content: "These templates have helped me deliver projects much faster. The documentation is clear and the designs are beautiful.",
          verified: true,
        },
      ],
    },
  },
  "business-suite-pro": {
    id: "business-suite-pro",
    name: "Business Suite Pro",
    game: "Bundle",
    basePrice: 79.99,
    variants: [
      { id: "standard", name: "Standard Suite", price: 79.99, description: "Core business tools" },
      { id: "premium", name: "Premium Suite", price: 129.99, description: "All tools + advanced features" },
      { id: "enterprise", name: "Enterprise Suite", price: 199.99, description: "Complete package + support" },
    ],
    longDescription:
      "The complete business software solution for modern companies. This comprehensive suite includes project management, CRM, accounting, and collaboration tools - everything you need to run your business efficiently.",
    features: [
      "Project management and task tracking",
      "Customer relationship management (CRM)",
      "Financial accounting and reporting",
      "Team collaboration platform",
      "Document management system",
      "Business analytics dashboard",
    ],
    images: [
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
    ],
    rating: 4.8,
    reviews: 2341,
    category: "Enterprise",
    reviewsData: {
      averageRating: 4.8,
      totalReviews: 2341,
      ratingBreakdown: {
        5: 1789,
        4: 387,
        3: 123,
        2: 28,
        1: 14,
      },
      recentReviews: [
        {
          id: 1,
          author: "BusinessOwner",
          rating: 5,
          date: "2024-01-30",
          title: "Complete business solution",
          content: "This suite has everything we need to manage our business. The integration between modules is seamless and the support is excellent.",
          verified: true,
        },
        {
          id: 2,
          author: "StartupCEO",
          rating: 5,
          date: "2024-01-27",
          title: "Perfect for growing companies",
          content: "We've been using this for 2 years and it's grown with our company. The scalability and feature set are impressive.",
          verified: true,
        },
        {
          id: 3,
          author: "ProjectManager",
          rating: 4,
          date: "2024-01-24",
          title: "Great project management features",
          content: "The project management module is particularly strong. Good reporting and the team loves the collaboration features.",
          verified: true,
        },
      ],
    },
  },
  crusader: {
    id: "crusader",
    name: "Crusader",
    game: "R6S",
    basePrice: 4.99,
    variants: [
      { id: "basic", name: "Basic License", price: 4.99, description: "1 month access" },
      { id: "premium", name: "Premium License", price: 8.99, description: "3 months access + priority support" },
      { id: "ultimate", name: "Ultimate License", price: 14.99, description: "6 months access + all features" },
    ],
    longDescription:
      "Crusader is our flagship Rainbow Six Siege enhancement tool designed for serious competitive players. With advanced features including aim assistance, visual enhancements, and strategic overlays, Crusader gives you the edge you need to dominate the battlefield.",
    features: [
      "Advanced aim assistance system",
      "Visual enhancement overlays",
      "Real-time enemy detection",
      "Customizable crosshair options",
      "Anti-detection technology",
      "24/7 customer support",
    ],
    images: [
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
    ],
    rating: 4.8,
    reviews: 1247,
    category: "Premium",
    reviewsData: {
      averageRating: 4.8,
      totalReviews: 1247,
      ratingBreakdown: {
        5: 892,
        4: 234,
        3: 89,
        2: 21,
        1: 11,
      },
      recentReviews: [
        {
          id: 1,
          author: "ProGamer2024",
          rating: 5,
          date: "2024-01-28",
          title: "Amazing product!",
          content:
            "This has completely transformed my gameplay. The features work flawlessly and the support team is incredibly responsive. Highly recommended!",
          verified: true,
        },
        {
          id: 2,
          author: "CompetitivePlayer",
          rating: 5,
          date: "2024-01-25",
          title: "Worth every penny",
          content:
            "Been using this for 3 months now. Never had any issues and it's helped me climb ranks significantly. The anti-detection is top-notch.",
          verified: true,
        },
        {
          id: 3,
          author: "CasualGamer",
          rating: 4,
          date: "2024-01-22",
          title: "Great but learning curve",
          content:
            "Excellent product overall. Took me a few days to get used to all the features, but once I did, it's been fantastic. Support helped me set it up perfectly.",
          verified: true,
        },
        {
          id: 4,
          author: "TacticalUser",
          rating: 5,
          date: "2024-01-20",
          title: "Best in class",
          content:
            "I've tried other similar products, but this one is by far the best. The visual enhancements are incredible and the aim assistance feels natural.",
          verified: true,
        },
        {
          id: 5,
          author: "NewUser123",
          rating: 4,
          date: "2024-01-18",
          title: "Solid choice",
          content:
            "Good product with regular updates. The team clearly cares about keeping everything working properly. Installation was straightforward.",
          verified: false,
        },
      ],
    },
  },
  "onyx-lite": {
    id: "onyx-lite",
    name: "Onyx Lite (Unlock All)",
    game: "R6S",
    basePrice: 4.99,
    variants: [
      { id: "starter", name: "Starter Pack", price: 4.99, description: "Basic unlock features" },
      { id: "pro", name: "Pro Pack", price: 7.99, description: "All unlock features + extras" },
    ],
    longDescription:
      "Onyx Lite provides essential Rainbow Six Siege enhancements with a focus on unlocking all content. Perfect for casual players who want access to all operators, skins, and game content without the grind.",
    features: [
      "Unlock all operators instantly",
      "Access to premium skins",
      "Bypass level restrictions",
      "Safe account protection",
      "Easy one-click setup",
      "Regular updates included",
    ],
    images: [
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
    ],
    rating: 4.6,
    reviews: 892,
    category: "Essential",
    reviewsData: {
      averageRating: 4.6,
      totalReviews: 892,
      ratingBreakdown: {
        5: 567,
        4: 201,
        3: 89,
        2: 25,
        1: 10,
      },
      recentReviews: [
        {
          id: 1,
          author: "UnlockMaster",
          rating: 5,
          date: "2024-01-26",
          title: "Perfect for unlocking everything",
          content:
            "Exactly what I needed. Got access to all operators and skins instantly. Works perfectly and hasn't caused any account issues.",
          verified: true,
        },
        {
          id: 2,
          author: "CasualPlayer99",
          rating: 4,
          date: "2024-01-23",
          title: "Great value",
          content:
            "Good product for the price. Setup was easy and everything works as advertised. Would recommend to friends.",
          verified: true,
        },
        {
          id: 3,
          author: "R6SFan",
          rating: 5,
          date: "2024-01-21",
          title: "Saves so much time",
          content:
            "No more grinding for operators! This saved me hundreds of hours. The unlock process is instant and safe.",
          verified: true,
        },
      ],
    },
  },
  "onyx-full": {
    id: "onyx-full",
    name: "Onyx Full (Unlock All)",
    game: "R6S",
    basePrice: 5.99,
    variants: [
      { id: "standard", name: "Standard Edition", price: 5.99, description: "Full unlock package" },
      { id: "deluxe", name: "Deluxe Edition", price: 9.99, description: "Full unlock + premium features" },
      { id: "ultimate", name: "Ultimate Edition", price: 15.99, description: "Everything included + lifetime updates" },
    ],
    longDescription:
      "Onyx Full is the complete Rainbow Six Siege enhancement package. Combining all unlock features with advanced gameplay enhancements, this is the ultimate tool for players who want everything.",
    features: [
      "Complete unlock all functionality",
      "Advanced gameplay enhancements",
      "Premium visual modifications",
      "Exclusive operator abilities",
      "Priority customer support",
      "Lifetime updates guarantee",
    ],
    images: [
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
      "/product-placeholder.png",
    ],
    rating: 4.9,
    reviews: 2156,
    category: "Ultimate",
    reviewsData: {
      averageRating: 4.9,
      totalReviews: 2156,
      ratingBreakdown: {
        5: 1834,
        4: 234,
        3: 67,
        2: 15,
        1: 6,
      },
      recentReviews: [
        {
          id: 1,
          author: "UltimateGamer",
          rating: 5,
          date: "2024-01-29",
          title: "The complete package",
          content:
            "This is everything you could want in one package. Unlocks, enhancements, visual mods - it's all here and works perfectly. Best purchase I've made!",
          verified: true,
        },
        {
          id: 2,
          author: "ProLeague",
          rating: 5,
          date: "2024-01-27",
          title: "Professional quality",
          content:
            "Using this for competitive play. The quality is outstanding and the lifetime updates make it worth every penny. Support team is also excellent.",
          verified: true,
        },
        {
          id: 3,
          author: "FullPackageUser",
          rating: 5,
          date: "2024-01-24",
          title: "Worth the upgrade",
          content:
            "Upgraded from Lite to Full and the difference is night and day. So many more features and everything just works seamlessly.",
          verified: true,
        },
        {
          id: 4,
          author: "LongTimeUser",
          rating: 4,
          date: "2024-01-22",
          title: "Consistently great",
          content:
            "Been using this for over a year. Regular updates keep everything working and new features are added regularly. Very satisfied.",
          verified: true,
        },
      ],
    },
  },
}

// Generate static params for all product pages
export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = products[slug as keyof typeof products]

  if (!product) {
    notFound()
  }

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
              href="/#products"
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
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-theme-secondary hover:text-[#3B82F6] transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-20-smaller">Back to Products</span>
            </Link>
          </div>

          {/* Product Content */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Product Image Gallery */}
            <div className="relative">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Product Header with Dynamic Price */}
              <ProductActionsWrapper product={product} />

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-theme">
                <div className="text-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6] mx-auto mb-2" />
                  <span className="text-xs text-theme-secondary">Secure</span>
                </div>
                <div className="text-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6] mx-auto mb-2" />
                  <span className="text-xs text-theme-secondary">Instant Access</span>
                </div>
                <div className="text-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6] mx-auto mb-2" />
                  <span className="text-xs text-theme-secondary">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description Tabs */}
          <div className="mt-16 sm:mt-20">
            <ProductDescriptionTabs product={product} />
          </div>

          {/* Related Products */}
          <div className="mt-16 sm:mt-20">
            <h2 className="text-xl sm:text-2xl heading-semibold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center">
              Other Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {Object.values(products)
                .filter((p) => p.id !== product.id)
                .slice(0, 2)
                .map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                    <div className="group relative w-full rounded-2xl sm:rounded-3xl border border-theme bg-theme-secondary p-2 shadow-theme hover:border-[#3B82F6]/30 transition-all duration-300">
                      <div className="relative w-full aspect-video cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl">
                        <Image
                          alt={relatedProduct.name}
                          fill
                          className="object-cover duration-200 group-hover:scale-105"
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-2 p-2">
                        <h3 className="flex flex-wrap items-center gap-1 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                          {relatedProduct.name}
                          <span className="ml-1 rounded-md border border-theme bg-theme-secondary px-2 py-0.5 text-xs shadow-md">
                            {relatedProduct.game}
                          </span>
                        </h3>
                        <div className="mt-2 flex w-full flex-col sm:flex-row items-center sm:items-end gap-3 sm:gap-4">
                          <Button className="w-full h-10 sm:h-12 rounded-full border border-theme bg-theme-secondary shadow-lg text-theme-primary text-sm sm:text-base hover:bg-gray-200 dark:hover:bg-white/15 transition-all duration-300">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Buy Now</span>
                          </Button>
                          <div className="flex flex-col items-center sm:items-end">
                            <span className="text-center sm:text-end text-xs text-theme-secondary">Starting at</span>
                            <span className="text-2xl sm:text-3xl font-bold text-[#3B82F6]">
                              <span className="mr-0.5 text-lg sm:text-xl">€</span>
                              {relatedProduct.basePrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
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
