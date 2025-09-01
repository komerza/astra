import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductItemProps {
  product: Product;
  index: number;
  selectedIndex: number;
  onClick: () => void;
  variant: "mobile" | "desktop";
}

export function ProductItem({
  product,
  index,
  selectedIndex,
  onClick,
  variant,
}: ProductItemProps) {
  const isSelected = selectedIndex === index;
  const baseClasses =
    variant === "mobile"
      ? "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-h-[44px]"
      : "flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group";
  const containerClasses =
    variant === "mobile" ? "w-12 h-12 rounded-xl" : "w-10 h-10 rounded-lg";
  const imageSize = variant === "mobile" ? 28 : 24;
  const imgClass = variant === "mobile" ? "w-7 h-7" : "w-6 h-6";
  const titleClass =
    variant === "mobile" ? "text-base font-medium" : "text-sm font-medium";
  const descClass = variant === "mobile" ? "text-sm" : "text-xs";
  const arrowClass = variant === "mobile" ? "w-5 h-5" : "w-4 h-4";
  const hoverBgClass = "hover:bg-white/10";
  const textPrimaryClass = "text-white";
  const textSecondaryClass = "text-[#808080]";

  return (
    <Link
      to={`/product?id=${encodeURIComponent(product.slug)}`}
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected
          ? "bg-blue-500/20 border border-blue-500/50"
          : `${hoverBgClass} border border-transparent`
      }`}
    >
      <div
        className={`${containerClasses} bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden`}
      >
        <img
          src={product.image || "/product-placeholder.png"}
          alt={product.name}
          width={imageSize}
          height={imageSize}
          className={`${imgClass} object-cover rounded`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`${textPrimaryClass} ${titleClass} truncate`}>
          {product.name}
        </h4>
        <p className={`${textSecondaryClass} ${descClass} truncate`}>
          €{product.basePrice.toFixed(2)} • ⚫ {product.status}
        </p>
      </div>
      <ArrowRight
        className={`${arrowClass} ${textSecondaryClass} ${
          variant === "desktop"
            ? `group-hover:${textPrimaryClass} transition-colors duration-200`
            : ""
        } flex-shrink-0`}
      />
    </Link>
  );
}

