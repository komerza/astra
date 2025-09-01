import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/use-search";

interface Props {
  product: Product;
  selected: boolean;
  onClick: () => void;
  variant: "mobile" | "desktop";
  textPrimaryClass: string;
  textSecondaryClass: string;
  hoverBgClass: string;
}

export function SearchProductItem({
  product,
  selected,
  onClick,
  variant,
  textPrimaryClass,
  textSecondaryClass,
  hoverBgClass,
}: Props) {
  const containerBase =
    variant === "mobile"
      ? "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-h-[44px]"
      : "flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group";
  const imageWrapper =
    variant === "mobile"
      ? "w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden"
      : "w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 overflow-hidden";
  const imgClass =
    variant === "mobile" ? "w-7 h-7 object-cover rounded" : "w-6 h-6 object-cover rounded";
  const titleClass =
    variant === "mobile"
      ? `${textPrimaryClass} text-base font-medium truncate`
      : `${textPrimaryClass} text-sm font-medium truncate`;
  const descClass =
    variant === "mobile"
      ? `${textSecondaryClass} text-sm truncate`
      : `${textSecondaryClass} text-xs truncate`;
  const arrowClass =
    variant === "mobile"
      ? `w-5 h-5 ${textSecondaryClass} flex-shrink-0`
      : `w-4 h-4 ${textSecondaryClass} group-hover:${textPrimaryClass} transition-colors duration-200 flex-shrink-0`;

  return (
    <Link
      to={`/product?id=${encodeURIComponent(product.slug)}`}
      onClick={onClick}
      className={`${containerBase} ${
        selected ? "bg-blue-500/20 border border-blue-500/50" : `${hoverBgClass} border border-transparent`
      }`}
    >
      <div className={imageWrapper}>
        <img
          src={product.image || "/product-placeholder.png"}
          alt={product.name}
          width={variant === "mobile" ? 28 : 24}
          height={variant === "mobile" ? 28 : 24}
          className={imgClass}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={titleClass}>{product.name}</h4>
        <p className={descClass}>€{product.basePrice.toFixed(2)} • ⚫ {product.status}</p>
      </div>
      <ArrowRight className={arrowClass} />
    </Link>
  );
}

