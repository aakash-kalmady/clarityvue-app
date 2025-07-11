/**
 * Login Page: Authentication page for user sign-in.
 *
 * This page provides:
 * - Clerk SignIn component integration
 * - Animated background elements
 * - Glassmorphism styling
 * - Responsive design for all devices
 *
 * Features:
 * - Seamless Clerk authentication flow
 * - Custom styling to match app theme
 * - Animated floating particles
 * - Gradient background overlays
 * - Mobile-responsive layout
 *
 * @returns Login page with Clerk SignIn component
 */
import { SignIn } from "@clerk/nextjs";

/**
 * Login page component that renders the Clerk SignIn interface.
 *
 * Layout:
 * - Full-screen container with animated background
 * - Centered Clerk SignIn component
 * - Custom styling to match app's galaxy theme
 * - Responsive design for all screen sizes
 *
 * @returns Login page with themed Clerk SignIn component
 */
export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements - Creates immersive atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-bounce" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />

      {/* Floating Particles - Adds dynamic movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Clerk SignIn Component - Custom styled authentication interface */}
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            // Card styling with glassmorphism effect
            card: "bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl",

            // Primary button with gradient styling
            formButtonPrimary:
              "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-purple-700 text-white font-bold transition-all duration-300",

            // Header styling for titles and subtitles
            headerTitle: "text-white drop-shadow-lg",
            headerSubtitle: "text-white/80",

            // Social buttons with glassmorphism
            socialButtonsBlockButton:
              "bg-white/30 text-white hover:bg-white/40",

            // Divider and footer styling
            dividerText: "text-white/70",
            footer: "bg-white/10 backdrop-blur-xl border-t border-white/20",
            footerAction: "text-white/90",
            footerActionLink: "text-pink-400 hover:text-pink-300",
            cardFooter:
              "bg-white/10 backdrop-blur-xl border-t border-white/20 text-white/70",

            // Form field styling
            formFieldInput: "bg-white/30 text-white placeholder-white/70",
            formFieldLabel: "text-white/90",
            formFieldInputShowPasswordButton: "text-white",
            formFieldInputErrorText: "text-pink-400",

            // Identity preview and links
            identityPreview: "bg-white/20 text-white",
            identityPreviewEditButton: "text-blue-400",
            formResendCodeLink: "text-blue-400",
            formFieldSuccessText: "text-green-400",
          },
          variables: {
            colorPrimary: "#a21caf", // fuchsia-700
            colorBackground: "rgba(30, 27, 75, 0.3)",
            colorText: "#fff",
            colorInputBackground: "rgba(255,255,255,0.15)",
            colorInputText: "#fff",
          },
        }}
      />
    </main>
  );
}
