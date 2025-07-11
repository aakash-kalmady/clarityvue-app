/**
 * Root Layout: The main layout component that wraps the entire application.
 *
 * This component provides:
 * - Global font configuration (Geist Sans and Geist Mono)
 * - Clerk authentication provider setup
 * - Theme provider configuration
 * - Global metadata and viewport settings
 * - Progress bar and toast notifications
 * - Dark theme as default
 *
 * Features:
 * - Server-side rendering support
 * - SEO optimization with metadata
 * - PWA capabilities with Apple Web App settings
 * - Responsive viewport configuration
 * - Global styling with gradient backgrounds
 *
 * @param children - React components to be rendered within the layout
 */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

// Font configuration for the application
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Global metadata configuration for SEO and PWA capabilities.
 *
 * Includes:
 * - Page title and description
 * - Keywords for search engines
 * - Author information
 * - Apple Web App settings
 * - Icon configuration
 */
export const metadata: Metadata = {
  title: "ClarityVue",
  description:
    "ClarityVue, developed by Aakash Kalmady, is a full-stack, modern photo album platform designed for photographers and hobbyists to showcase their work. Built with a high-performance, server-rendered stack, it provides a seamless and secure experience for users to manage and share their visual content.",
  icons: {
    icon: "/assets/logo.png",
  },
  keywords: [
    "photo portfolio",
    "photography",
    "album",
    "gallery",
    "professional",
  ],
  authors: [{ name: "Aakash Kalmady" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ClarityVue",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

/**
 * Viewport configuration for responsive design and PWA support.
 *
 * Settings:
 * - Device width scaling
 * - Disabled user scaling for consistent experience
 * - Theme color for browser UI
 * - Viewport fit for mobile devices
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

/**
 * Root layout component that wraps the entire application.
 *
 * Provides:
 * - Clerk authentication context
 * - Theme provider for dark/light mode
 * - Progress bar for navigation feedback
 * - Toast notifications system
 * - Global styling with gradient backgrounds
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}
        >
          {/* Theme provider for dark/light mode support */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Progress bar for navigation feedback */}
            <NextTopLoader
              color="#3b82f6"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
            />

            {/* Toast notification system */}
            <Toaster
              position="top-center"
              theme="dark"
              toastOptions={{
                style: {
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                },
              }}
            />

            {/* Main application content */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
