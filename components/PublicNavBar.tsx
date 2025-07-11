/**
 * PublicNavBar: Navigation component for unauthenticated users.
 *
 * This component provides:
 * - Logo and branding elements
 * - Sign-in and sign-up buttons via Clerk
 * - Responsive design for all screen sizes
 * - Glassmorphism styling with backdrop blur
 *
 * Features:
 * - Clerk authentication integration
 * - Responsive logo and text sizing
 * - Hover effects and transitions
 * - Gradient styling for buttons
 * - Glassmorphism background effects
 *
 * @returns Public navigation bar with authentication buttons
 */
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";

/**
 * Public navigation bar component for unauthenticated users.
 *
 * Layout:
 * - Logo and app name on the left
 * - Authentication buttons on the right
 * - Responsive design for mobile and desktop
 * - Glassmorphism styling for consistency
 *
 * @returns Public navigation bar with branding and auth buttons
 */
export default function PublicNavBar() {
  return (
    <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      {/* Logo and App Name - Branding section */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Image
            src="/assets/logo.svg"
            width={28}
            height={28}
            className="sm:w-8 sm:h-8"
            alt="Logo"
          />
        </div>
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          ClarityVue
        </span>
      </div>

      {/* Navigation Items - Authentication buttons */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Sign In Button */}
        <SignInButton>
          <Button
            variant="ghost"
            className="text-white/80 hover:text-white text-sm sm:text-base transition-all duration-300 hover:scale-105"
          >
            Sign In
          </Button>
        </SignInButton>

        {/* Sign Up Button with gradient styling */}
        <SignUpButton>
          <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg">
            Sign Up
          </Button>
        </SignUpButton>
      </div>
    </nav>
  );
}
