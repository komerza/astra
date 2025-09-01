import { useEffect, useState } from "react";

export function useKomerza() {
  const [ready, setReady] = useState(() => typeof globalThis.komerza !== "undefined");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const onReady = () => setReady(true);
    const onError = () => setError(new Error("Failed to load Komerza"));
    document.addEventListener("komerza:ready", onReady);
    document.addEventListener("komerza:load-error", onError);
    return () => {
      document.removeEventListener("komerza:ready", onReady);
      document.removeEventListener("komerza:load-error", onError);
    };
  }, []);

  return { ready, error };
}
