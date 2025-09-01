import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadKomerza } from "@/lib/komerza-loader";
import { KOMERZA_STORE_ID } from "@/lib/komerza";

interface KomerzaState {
  ready: boolean;
  error: Error | null;
}

const KomerzaContext = createContext<KomerzaState>({ ready: false, error: null });

export function useKomerzaState() {
  return useContext(KomerzaContext);
}

export function useKomerza() {
  return useKomerzaState();
}

export function KomerzaProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KomerzaState>({ ready: false, error: null });

  useEffect(() => {
    loadKomerza()
      .then(() => {
        try {
          globalThis.komerza?.init?.(KOMERZA_STORE_ID);
          setState({ ready: true, error: null });
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

  return <KomerzaContext.Provider value={state}>{children}</KomerzaContext.Provider>;
}
