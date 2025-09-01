import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadKomerza } from "@/lib/komerza-loader";
import { komerzaCache } from "@/lib/komerza-cache";
import { KOMERZA_STORE_ID } from "@/lib/komerza";

interface KomerzaState {
  ready: boolean;
  error: Error | null;
}

const KomerzaContext = createContext<KomerzaState>({
  ready: false,
  error: null,
});

export function useKomerzaState() {
  return useContext(KomerzaContext);
}

export function useKomerza() {
  return useKomerzaState();
}

export function KomerzaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KomerzaState>({
    ready: false,
    error: null,
  });

  useEffect(() => {
    // Log StrictMode info in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        "🔧 Development Mode: React.StrictMode may cause effects to run twice"
      );
      console.log("🔧 This is normal behavior and helps catch side effects");
      console.log("🔧 In production, only 1 API call will be made");
    }

    loadKomerza()
      .then(() => {
        try {
          (globalThis as any).komerza?.init?.(KOMERZA_STORE_ID);
          setState({ ready: true, error: null });

          // Only warm cache in production to avoid StrictMode double-execution issues
          if (process.env.NODE_ENV === "production") {
            setTimeout(() => {
              komerzaCache.warmCache().catch((err) => {
                console.warn("Cache warming failed:", err);
              });
            }, 100);
          }
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          setState({ ready: false, error });
        }
      })
      .catch((err) => {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ ready: false, error });
      });
  }, []);

  if (!state.ready) {
    return null;
  }

  return (
    <KomerzaContext.Provider value={state}>{children}</KomerzaContext.Provider>
  );
}
