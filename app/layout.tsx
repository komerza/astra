import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "./context/cart-context"

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
    <html lang="en" className={inter.variable}>
      <head>
        <script src="https://cdn.komerza.com/komerza.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: 'globalThis.komerza.init("STORE_ID");',
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
