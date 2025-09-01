"use client";

import { cn } from "@/lib/utils";
import { useStoreBanner } from "@/lib/use-store-banner";
import { Skeleton } from "@/components/ui/skeleton";

export function StoreBanner({ className }: { className?: string }) {
  const { url, loading } = useStoreBanner();
  if (loading) {
    return <Skeleton className={cn("h-6 w-24", className)} />;
  }
  return <img src={url} alt="Komerza" className={className} />;
}
