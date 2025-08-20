import Link from "next/link"
import Image from "next/image"
import { Home, Package, Activity } from "lucide-react"
import { CartButton } from "@/app/components/cart-button"
import { MobileNav } from "@/app/components/mobile-nav"
import { SearchButton } from "@/app/components/search-button"

export function ProductsHeader() {
  return (
    <header className="h-16 flex items-center justify-between container mx-auto top-0 absolute inset-x-0 z-50 px-4 sm:px-6">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <Image
            src="/kimera-logo.svg"
            alt="Komerza"
            width={138}
            height={55}
            className="h-8 sm:h-9 w-auto"
          />
        </Link>
        <div className="items-center gap-4 hidden md:flex">
          <Link
            href="/"
            className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
          >
            <Home className="w-[18px] h-[18px]" />
            <span className="text-sm font-normal tracking-20-smaller">
              Home
            </span>
          </Link>
          <Link
            href="/products"
            className="text-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-[#3B82F6]/10 px-2.5 py-1.5 transition-colors duration-300"
          >
            <Package className="w-[18px] h-[18px]" />
            <span className="text-sm font-normal tracking-20-smaller">
              Products
            </span>
          </Link>
          <Link
            href="/status"
            className="text-theme-secondary hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 flex items-center gap-2 rounded-md bg-transparent px-2.5 py-1.5 transition-colors duration-300"
          >
            <Activity className="w-[18px] h-[18px]" />
            <span className="text-sm font-normal tracking-20-smaller">
              Status
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SearchButton />
        <div className="hidden md:flex items-center gap-4">
          <CartButton />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}
