import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SuggestedItem } from "@/lib/use-search";

interface Props {
  item: SuggestedItem;
  selected: boolean;
  onClick: () => void;
  variant: "mobile" | "desktop";
  textPrimaryClass: string;
  textSecondaryClass: string;
  hoverBgClass: string;
}

export function SearchSuggestionItem({
  item,
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
  const iconWrapper =
    variant === "mobile"
      ? "w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0"
      : "w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0";
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
  const IconComponent = item.icon;
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`${containerBase} ${
        selected ? "bg-blue-500/20 border border-blue-500/50" : `${hoverBgClass} border border-transparent`
      }`}
    >
      <div className={iconWrapper}>
        <IconComponent className="w-6 h-6 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={titleClass}>{item.name}</h4>
        <p className={descClass}>{item.description}</p>
      </div>
      <ArrowRight className={arrowClass} />
    </Link>
  );
}

