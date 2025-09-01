import { Home, Package, HelpCircle, CreditCard, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLinkItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  external?: boolean;
}

export const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/products", icon: Package },
  { label: "Support", href: "/dashboard/support", icon: HelpCircle },
  { label: "Payment Methods", href: "/payment-methods", icon: CreditCard },
  { label: "Discord", href: "https://discord.com", icon: MessageCircle, external: true },
];

export const desktopNavLinkClass =
  "duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]";

export const mobileNavLinkClass =
  "text-theme-secondary hover:text-[#3B82F6] hover:bg-gray-100 dark:hover:bg-white/15 flex items-center gap-3 rounded-md bg-transparent px-4 py-3 transition-colors duration-300 mobile-touch-target";
