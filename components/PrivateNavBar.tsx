/**
 * PrivateNavBar: Navigation component for authenticated users with responsive design.
 *
 * This component provides:
 * - Mobile/tablet top navigation bar
 * - Desktop collapsible sidebar navigation
 * - User profile information display
 * - Navigation links for dashboard, album creation, and profile
 * - Clerk UserButton integration
 * - Responsive design for all screen sizes
 *
 * Features:
 * - Collapsible sidebar for desktop layout
 * - Fixed top navigation for mobile/tablet
 * - Glassmorphism styling with backdrop blur
 * - Hover effects and transitions
 * - Profile information display
 * - Logo and branding elements
 * - Responsive icon and text sizing
 *
 * Layouts:
 * - Mobile/Tablet: Fixed top bar with compact navigation
 * - Desktop: Collapsible sidebar with full navigation
 *
 * @param profile - Optional user profile data for display
 *
 * @example
 * <PrivateNavBar profile={{ displayName: "John Doe", username: "john" }} />
 */
"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Plus,
  Home,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";

/**
 * Private navigation component with responsive design and user management.
 *
 * State Management:
 * - Sidebar collapse state for desktop layout
 * - Responsive behavior for different screen sizes
 * - User profile integration
 *
 * @param profile - Optional user profile data
 * @returns Navigation component with responsive layout
 */
export default function PrivateNavBar({
  profile,
}: {
  profile?: {
    displayName?: string;
    username?: string;
  };
}) {
  // State for sidebar collapse functionality
  const [isCollapsed, setIsCollapsed] = useState(true);

  /**
   * Toggles the sidebar collapse state for desktop layout.
   */
  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Mobile/Tablet Top Navigation
  /**
   * Mobile and tablet navigation bar component.
   *
   * Features:
   * - Fixed positioning at top of screen
   * - Compact navigation with icons and text
   * - Logo and branding elements
   * - User authentication integration
   *
   * @returns Mobile navigation bar component
   */
  const MobileTopNav = () => (
    <div className="lg:hidden bg-white/5 backdrop-blur-xl border-b border-white/10 fixed top-0 left-0 right-0 z-50 pt-safe-area-top h-14">
      <div className="flex items-center justify-between px-3 p-2">
        {/* Logo - smaller on mobile */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-1.5">
            <Image src="/assets/logo.svg" width={20} height={20} alt="Logo" />
            <span className="text-sm font-bold text-white sm:inline">
              ClarityVue
            </span>
          </Link>
        </div>

        {/* Navigation buttons - optimized for mobile */}
        <div className="flex items-center gap-1">
          {/* Home - icon only on very small screens */}
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 text-sm px-2 sm:px-3 h-10 min-w-0"
            >
              <Home className="w-4 h-4 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline truncate">Home</span>
            </Button>
          </Link>

          {/* New Album - icon only on very small screens */}
          <Link href="/album/new">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 text-sm px-2 sm:px-3 h-10 min-w-0"
            >
              <Plus className="w-4 h-4 sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline truncate">New</span>
            </Button>
          </Link>

          {/* View Profile - show on all screens but with different styling */}
          {profile && (
            <Link href={`/u/${profile.username}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 text-sm px-2 sm:px-3 h-10 min-w-0"
              >
                <User className="w-4 h-4 sm:mr-2 flex-shrink-0" />
                <span className="hidden sm:inline truncate">Profile</span>
              </Button>
            </Link>
          )}

          {/* User Button - smaller on mobile */}
          <SignedIn>
            <div className="ml-1 flex flex-shrink-0 items-center justify-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar Navigation
  /**
   * Desktop sidebar navigation component.
   *
   * Features:
   * - Collapsible sidebar with toggle functionality
   * - Full navigation with icons and text
   * - User profile section with information
   * - Logo and branding elements
   * - Smooth transitions and animations
   *
   * @returns Desktop sidebar navigation component
   */
  const DesktopSidebar = () => (
    <div className="hidden lg:flex relative bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col transition-all duration-300">
      {/* Logo Section with collapse toggle */}
      <div className={"border-b border-white/10 py-4 "}>
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-between">
            <Link
              href="/dashboard"
              className="flex justify-center items-center"
              title="Dashboard"
            >
              <Image
                src="/assets/logo.svg"
                width={24}
                height={24}
                className="lg:w-6 lg:h-6"
                alt="Logo"
              />
            </Link>

            <button
              onClick={toggleCollapsed}
              className="mt-4 text-white/60 hover:text-white transition-colors flex justify-center items-center"
              title="Toggle Sidebar"
            >
              <ArrowRightToLine />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-start">
            <Button asChild variant="link">
              <Link href="/dashboard">
                <span className="text-xl font-bold text-white truncate">
                  ClarityVue
                </span>
              </Link>
            </Button>

            <button
              onClick={toggleCollapsed}
              className="text-white/60 hover:text-white transition-colors flex justify-center items-center"
            >
              <ArrowLeftToLine />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 p-2">
        {/* Dashboard Link */}
        {isCollapsed ? (
          <Link href="/dashboard" title="Home">
            <Button
              size={"sm"}
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-base justify-center"
            >
              <Home className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Button
              size={"sm"}
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-base justify-start px-2"
            >
              <Home className="mr-2 w-5 h-5" />
              <span className="truncate">Dashboard</span>
            </Button>
          </Link>
        )}

        {/* Create Album Link */}
        {isCollapsed ? (
          <Link href="/album/new" title="Create Album">
            <Button
              size={"sm"}
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-base justify-center"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Link href="/album/new">
            <Button
              size={"sm"}
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-base justify-start px-2"
            >
              <Plus className="mr-2 w-5 h-5" />
              <span className="truncate">Create Album</span>
            </Button>
          </Link>
        )}

        {/* Profile Link - conditional rendering */}
        {profile &&
          (isCollapsed ? (
            <Link href={`/u/${profile.username}`} title="View Profile">
              <Button
                size={"sm"}
                variant="ghost"
                className="w-full flex text-white hover:bg-white/10 hover:text-white text-base justify-center"
              >
                <User className="w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link href={`/u/${profile.username}`}>
              <Button
                size={"sm"}
                variant="ghost"
                className="w-full flex text-white hover:bg-white/10 hover:text-white text-base justify-start px-2"
              >
                <User className="mr-2 w-5 h-5" />
                <span className="truncate">Profile</span>
              </Button>
            </Link>
          ))}
      </nav>

      {/* User Section with profile information */}
      <div className="p-2 border-t">
        <div
          className={`flex flex-row items-center p-2 rounded-2xl  ${
            isCollapsed ? "justify-center" : "justify-start bg-white/5"
          }`}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
          {!isCollapsed && (
            <div className="ml-2 min-w-0 flex flex-col items-start justify-center">
              <p className="text-xs font-medium text-white truncate">
                {profile?.displayName || "User"}
              </p>
              <p className="text-xs text-white/60 truncate">
                {profile?.username || "username"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MobileTopNav />
      <DesktopSidebar />
    </>
  );
}
