import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./context/cart-context"
import { KOMERZA_STORE_ID } from "@/lib/komerza"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "LandFree - Transform Your Ideas Into Reality",
  description: "Expert web development services for stunning online experiences.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
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
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
