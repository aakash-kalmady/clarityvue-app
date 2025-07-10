import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClarityVue - Professional Photo Portfolio Platform",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "transparent",
          colorPrimary: "#3b82f6",
          colorText: "#ffffff",
          colorTextSecondary: "rgba(255, 255, 255, 0.7)",
          colorInputBackground: "rgba(255, 255, 255, 0.1)",
          colorInputText: "#ffffff",
          borderRadius: "0.5rem",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontSize: "0.875rem",
        },
        elements: {
          card: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
          headerTitle: "text-white text-lg sm:text-xl font-semibold",
          headerSubtitle: "text-white/60 text-sm",
          formFieldInput:
            "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base transition-all duration-200",
          formFieldLabel: "text-white/80 text-sm font-medium",
          formButtonPrimary:
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl",
          formButtonSecondary:
            "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200 text-sm",
          footerActionLink:
            "text-blue-400 hover:text-blue-300 text-sm transition-colors",
          dividerLine: "bg-white/20",
          dividerText: "text-white/60 text-sm",
          socialButtonsBlockButton:
            "bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-200 text-sm",
          socialButtonsBlockButtonText: "text-white text-sm",
          formResendCodeLink:
            "text-blue-400 hover:text-blue-300 text-sm transition-colors",
          modalBackdrop: "bg-black/50 backdrop-blur-sm",
          modalContent:
            "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
          modalOverlay: "bg-black/50 backdrop-blur-sm",
          modalRootBox: "bg-black/50 backdrop-blur-sm",
          modalCard:
            "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
          modalContentRoot:
            "bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl",
          formFieldInputShowPasswordButton:
            "text-white/60 hover:text-white transition-colors",
          formFieldInputShowPasswordIcon: "text-white/60",
          formFieldInputShowPasswordIconPath: "text-white/60",
          formFieldInputShowPasswordButtonIcon: "text-white/60",
          formFieldInputShowPasswordButtonIconPath: "text-white/60",
          formFieldInputShowPasswordButtonIconPath2: "text-white/60",
          formFieldInputShowPasswordButtonIconPath3: "text-white/60",
          formFieldInputShowPasswordButtonIconPath4: "text-white/60",
          formFieldInputShowPasswordButtonIconPath5: "text-white/60",
          formFieldInputShowPasswordButtonIconPath6: "text-white/60",
          formFieldInputShowPasswordButtonIconPath7: "text-white/60",
          formFieldInputShowPasswordButtonIconPath8: "text-white/60",
          formFieldInputShowPasswordButtonIconPath9: "text-white/60",
          formFieldInputShowPasswordButtonIconPath10: "text-white/60",
          formFieldInputShowPasswordButtonIconPath11: "text-white/60",
          formFieldInputShowPasswordButtonIconPath12: "text-white/60",
          formFieldInputShowPasswordButtonIconPath13: "text-white/60",
          formFieldInputShowPasswordButtonIconPath14: "text-white/60",
          formFieldInputShowPasswordButtonIconPath15: "text-white/60",
          formFieldInputShowPasswordButtonIconPath16: "text-white/60",
          formFieldInputShowPasswordButtonIconPath17: "text-white/60",
          formFieldInputShowPasswordButtonIconPath18: "text-white/60",
          formFieldInputShowPasswordButtonIconPath19: "text-white/60",
          formFieldInputShowPasswordButtonIconPath20: "text-white/60",
          formFieldInputShowPasswordButtonIconPath21: "text-white/60",
          formFieldInputShowPasswordButtonIconPath22: "text-white/60",
          formFieldInputShowPasswordButtonIconPath23: "text-white/60",
          formFieldInputShowPasswordButtonIconPath24: "text-white/60",
          formFieldInputShowPasswordButtonIconPath25: "text-white/60",
          formFieldInputShowPasswordButtonIconPath26: "text-white/60",
          formFieldInputShowPasswordButtonIconPath27: "text-white/60",
          formFieldInputShowPasswordButtonIconPath28: "text-white/60",
          formFieldInputShowPasswordButtonIconPath29: "text-white/60",
          formFieldInputShowPasswordButtonIconPath30: "text-white/60",
          formFieldInputShowPasswordButtonIconPath31: "text-white/60",
          formFieldInputShowPasswordButtonIconPath32: "text-white/60",
          formFieldInputShowPasswordButtonIconPath33: "text-white/60",
          formFieldInputShowPasswordButtonIconPath34: "text-white/60",
          formFieldInputShowPasswordButtonIconPath35: "text-white/60",
          formFieldInputShowPasswordButtonIconPath36: "text-white/60",
          formFieldInputShowPasswordButtonIconPath37: "text-white/60",
          formFieldInputShowPasswordButtonIconPath38: "text-white/60",
          formFieldInputShowPasswordButtonIconPath39: "text-white/60",
          formFieldInputShowPasswordButtonIconPath40: "text-white/60",
          formFieldInputShowPasswordButtonIconPath41: "text-white/60",
          formFieldInputShowPasswordButtonIconPath42: "text-white/60",
          formFieldInputShowPasswordButtonIconPath43: "text-white/60",
          formFieldInputShowPasswordButtonIconPath44: "text-white/60",
          formFieldInputShowPasswordButtonIconPath45: "text-white/60",
          formFieldInputShowPasswordButtonIconPath46: "text-white/60",
          formFieldInputShowPasswordButtonIconPath47: "text-white/60",
          formFieldInputShowPasswordButtonIconPath48: "text-white/60",
          formFieldInputShowPasswordButtonIconPath49: "text-white/60",
          formFieldInputShowPasswordButtonIconPath50: "text-white/60",
          formFieldInputShowPasswordButtonIconPath51: "text-white/60",
          formFieldInputShowPasswordButtonIconPath52: "text-white/60",
          formFieldInputShowPasswordButtonIconPath53: "text-white/60",
          formFieldInputShowPasswordButtonIconPath54: "text-white/60",
          formFieldInputShowPasswordButtonIconPath55: "text-white/60",
          formFieldInputShowPasswordButtonIconPath56: "text-white/60",
          formFieldInputShowPasswordButtonIconPath57: "text-white/60",
          formFieldInputShowPasswordButtonIconPath58: "text-white/60",
          formFieldInputShowPasswordButtonIconPath59: "text-white/60",
          formFieldInputShowPasswordButtonIconPath60: "text-white/60",
          formFieldInputShowPasswordButtonIconPath61: "text-white/60",
          formFieldInputShowPasswordButtonIconPath62: "text-white/60",
          formFieldInputShowPasswordButtonIconPath63: "text-white/60",
          formFieldInputShowPasswordButtonIconPath64: "text-white/60",
          formFieldInputShowPasswordButtonIconPath65: "text-white/60",
          formFieldInputShowPasswordButtonIconPath66: "text-white/60",
          formFieldInputShowPasswordButtonIconPath67: "text-white/60",
          formFieldInputShowPasswordButtonIconPath68: "text-white/60",
          formFieldInputShowPasswordButtonIconPath69: "text-white/60",
          formFieldInputShowPasswordButtonIconPath70: "text-white/60",
          formFieldInputShowPasswordButtonIconPath71: "text-white/60",
          formFieldInputShowPasswordButtonIconPath72: "text-white/60",
          formFieldInputShowPasswordButtonIconPath73: "text-white/60",
          formFieldInputShowPasswordButtonIconPath74: "text-white/60",
          formFieldInputShowPasswordButtonIconPath75: "text-white/60",
          formFieldInputShowPasswordButtonIconPath76: "text-white/60",
          formFieldInputShowPasswordButtonIconPath77: "text-white/60",
          formFieldInputShowPasswordButtonIconPath78: "text-white/60",
          formFieldInputShowPasswordButtonIconPath79: "text-white/60",
          formFieldInputShowPasswordButtonIconPath80: "text-white/60",
          formFieldInputShowPasswordButtonIconPath81: "text-white/60",
          formFieldInputShowPasswordButtonIconPath82: "text-white/60",
          formFieldInputShowPasswordButtonIconPath83: "text-white/60",
          formFieldInputShowPasswordButtonIconPath84: "text-white/60",
          formFieldInputShowPasswordButtonIconPath85: "text-white/60",
          formFieldInputShowPasswordButtonIconPath86: "text-white/60",
          formFieldInputShowPasswordButtonIconPath87: "text-white/60",
          formFieldInputShowPasswordButtonIconPath88: "text-white/60",
          formFieldInputShowPasswordButtonIconPath89: "text-white/60",
          formFieldInputShowPasswordButtonIconPath90: "text-white/60",
          formFieldInputShowPasswordButtonIconPath91: "text-white/60",
          formFieldInputShowPasswordButtonIconPath92: "text-white/60",
          formFieldInputShowPasswordButtonIconPath93: "text-white/60",
          formFieldInputShowPasswordButtonIconPath94: "text-white/60",
          formFieldInputShowPasswordButtonIconPath95: "text-white/60",
          formFieldInputShowPasswordButtonIconPath96: "text-white/60",
          formFieldInputShowPasswordButtonIconPath97: "text-white/60",
          formFieldInputShowPasswordButtonIconPath98: "text-white/60",
          formFieldInputShowPasswordButtonIconPath99: "text-white/60",
          formFieldInputShowPasswordButtonIconPath100: "text-white/60",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
