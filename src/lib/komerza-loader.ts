export function loadKomerza(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof globalThis.komerza !== "undefined") {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>("script[data-komerza]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Failed to load Komerza script")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.komerza.com/komerza.min.js";
    script.async = true;
    script.dataset.komerza = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Komerza script"));
    document.head.appendChild(script);
  });
}
