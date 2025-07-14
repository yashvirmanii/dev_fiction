import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "DevTools Pro - Professional Developer Utilities",
    template: "%s | DevTools Pro",
  },
  description:
    "Professional developer tools for JSON formatting, Base64 encoding, JWT decoding, and more. Built for developers, by developers.",
  keywords: ["developer tools", "JSON formatter", "Base64 encoder", "JWT decoder", "regex tester"],
  authors: [{ name: "DevTools Pro Team" }],
  creator: "DevTools Pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devtools-pro.vercel.app",
    title: "DevTools Pro - Professional Developer Utilities",
    description: "Professional developer tools for JSON formatting, Base64 encoding, JWT decoding, and more.",
    siteName: "DevTools Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTools Pro - Professional Developer Utilities",
    description: "Professional developer tools for JSON formatting, Base64 encoding, JWT decoding, and more.",
    creator: "@devtoolspro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ErrorBoundary>{children}</ErrorBoundary>
            <Toaster />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
