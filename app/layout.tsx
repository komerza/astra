import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "./context/cart-context"
import { KOMERZA_STORE_ID } from "@/lib/komerza"

export const metadata: Metadata = {
  title: "Komerza Astra - Start your commerce journey",
  description:
    "Expert web development services for stunning online experiences.",
  generator: "komerza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.komerza.com/komerza.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function initKomerza() {
                if (typeof globalThis.komerza !== 'undefined') {
                  globalThis.komerza.init("${KOMERZA_STORE_ID}");
                } else {
                  setTimeout(initKomerza, 100);
                }
              }
              document.documentElement.classList.add('dark');
              document.documentElement.classList.remove('light');
              localStorage.setItem('theme', 'dark');

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initKomerza);
              } else {
                initKomerza();
              }
            `,
          }}
        />
      </head>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
