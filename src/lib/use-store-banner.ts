import { useEffect, useState } from "react";
import { useKomerza } from "@/KomerzaProvider";

export function useStoreBanner(fallback = "/komerza-logo.png") {
  const { ready } = useKomerza();
  const [url, setUrl] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    (async () => {
      try {
        const banner = await globalThis.komerza.getStoreBannerUrl();
        if (banner && !cancelled) setUrl(banner);
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load store banner, using fallback:", e);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready]);

  return { url, loading };
}
