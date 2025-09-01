import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { SuggestedItem } from "@/lib/use-search";

interface SuggestionItemProps {
  item: SuggestedItem;
  index: number;
  selectedIndex: number;
  onClick: () => void;
  variant: "mobile" | "desktop";
}

export function SuggestionItem({
  item,
  index,
  selectedIndex,
  onClick,
  variant,
}: SuggestionItemProps) {
  const IconComponent = item.icon;
  const isSelected = selectedIndex === index;
  const baseClasses =
    variant === "mobile"
      ? "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 min-h-[44px]"
      : "flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group";
  const containerClasses =
    variant === "mobile" ? "w-12 h-12 rounded-xl" : "w-10 h-10 rounded-lg";
  const iconClass = variant === "mobile" ? "w-6 h-6" : "w-5 h-5";
  const titleClass =
    variant === "mobile" ? "text-base font-medium" : "text-sm font-medium";
  const descClass = variant === "mobile" ? "text-sm" : "text-xs";
  const arrowClass = variant === "mobile" ? "w-5 h-5" : "w-4 h-4";
  const hoverBgClass = "hover:bg-white/10";
  const textPrimaryClass = "text-white";
  const textSecondaryClass = "text-[#808080]";

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected
          ? "bg-blue-500/20 border border-blue-500/50"
          : `${hoverBgClass} border border-transparent`
      }`}
    >
      <div
        className={`${containerClasses} bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0`}
      >
        <IconComponent className={`${iconClass} text-blue-500`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`${textPrimaryClass} ${titleClass} truncate`}>
          {item.name}
        </h4>
        <p className={`${textSecondaryClass} ${descClass} truncate`}>
          {item.description}
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

