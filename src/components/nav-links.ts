import type { LucideIcon } from "lucide-react";
import { Home, Package, HelpCircle, Activity, CreditCard } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon?: LucideIcon;
  external?: boolean;
  showInNavbar?: boolean;
  showInMobile?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: Home, showInMobile: true },
  {
    label: "Products",
    href: "/products",
    icon: Package,
    showInNavbar: true,
    showInMobile: true,
  },
  {
    label: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
    showInMobile: true,
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: Activity,
    external: true,
    showInNavbar: true,
  },
  {
    label: "Payment Methods",
    href: "/payment-methods",
    icon: CreditCard,
    showInNavbar: true,
  },
];

export const navButtonClass =
  "duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs text-muted-foreground hover:bg-[#ffffff05]";
