import { useEffect, useState } from "react";
import { useKomerza } from "@/KomerzaProvider";

const defaultFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

let cachedFormatter: Intl.NumberFormat = defaultFormatter;
let initPromise: Promise<Intl.NumberFormat> | null = null;
const listeners = new Set<(f: Intl.NumberFormat) => void>();

function notify(formatter: Intl.NumberFormat) {
  listeners.forEach((l) => {
    try {
      l(formatter);
    } catch {
      // ignore listener errors
    }
  });
}

export function useCurrencyFormatter() {
  const { ready } = useKomerza();
  const [formatter, setFormatter] = useState<Intl.NumberFormat>(cachedFormatter);

  useEffect(() => {
    listeners.add(setFormatter);
    return () => {
      listeners.delete(setFormatter);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (cachedFormatter !== defaultFormatter) {
      setFormatter(cachedFormatter);
      return;
    }

    if (!initPromise) {
      const api: any = globalThis.komerza;
      initPromise = api?.createFormatter
        ? api.createFormatter()
        : Promise.resolve(defaultFormatter);

      initPromise
        .then((fmt) => {
          cachedFormatter = fmt;
          notify(fmt);
        })
        .catch(() => {
          // keep default formatter on error
        });
    }
  }, [ready]);

  return formatter;
}

