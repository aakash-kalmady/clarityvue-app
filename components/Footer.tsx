/**
 * Footer: Reusable site footer component with copyright and navigation links.
 *
 * This component provides:
 * - Copyright information with author attribution
 * - Navigation links to privacy policy
 * - Conditional home button for privacy page
 * - Responsive design for all screen sizes
 *
 * Features:
 * - Glassmorphism styling with backdrop blur
 * - Conditional animation based on page context
 * - Responsive text sizing and spacing
 * - Hover effects on interactive elements
 * - Conditional rendering of home button
 *
 * @param isPrivacyPage - Boolean flag to control footer behavior on privacy page
 *
 * @example
 * <Footer /> // Default footer with animation
 *
 * @example
 * <Footer isPrivacyPage={true} /> // Footer with home button and no animation
 */
import { Button } from "./ui/button";
import Link from "next/link";

/**
 * Footer component that displays copyright and navigation links.
 *
 * Behavior:
 * - Shows copyright and privacy link by default
 * - Adds home button when on privacy page
 * - Controls animation based on page context
 * - Uses glassmorphism styling for consistency
 *
 * @param isPrivacyPage - Controls footer behavior and animation
 * @returns Footer component with copyright and navigation
 */
export default function Footer({
  isPrivacyPage = false,
}: {
  isPrivacyPage?: boolean;
}) {
  return (
    <footer
      className={`relative z-10 border-t border-white/10 py-2 sm:py-3 px-4 sm:px-6 bg-white/5 backdrop-blur-xl mt-auto ${
        isPrivacyPage
          ? ""
          : "opacity-0 animate-[fadeIn_1s_ease-out_1.8s_forwards]"
      }`}
    >
      {/* Footer content with responsive layout */}
      <div className="flex flex-row items-center justify-between gap-x-4 text-white/60 text-xs w-full">
        {/* Copyright information */}
        <p className="text-left">&copy; 2025 - Aakash Kalmady</p>

        {/* Navigation links */}
        <div className="flex items-center gap-4">
          {/* Conditional home button for privacy page */}
          {isPrivacyPage && (
            <Button
              variant="link"
              asChild
              size="sm"
              className="text-white/60 hover:text-white text-xs h-6 px-2"
            >
              <Link href="/">Home</Link>
            </Button>
          )}

          {/* Privacy policy link */}
          <Button
            variant="link"
            asChild
            size="sm"
            className="text-white/60 hover:text-white text-xs h-6 px-2"
          >
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
