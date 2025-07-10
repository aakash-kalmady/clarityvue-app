"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Plus, ChevronLeft, ChevronRight, Eye, Home } from "lucide-react";

interface PrivateNavBarProps {
  profile?: {
    displayName?: string;
    username?: string;
  };
}

const PrivateNavBar = memo(function PrivateNavBar({
  profile,
}: PrivateNavBarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  // Mobile/Tablet Top Navigation
  const MobileTopNav = () => (
    <div className="lg:hidden bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 pt-safe-area-top">
      <div className="flex items-center justify-between px-3 py-2">
        {/* Logo - smaller on mobile */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-1.5">
            <Image src="/assets/logo.svg" width={20} height={20} alt="Logo" />
            <span className="text-sm font-bold text-white hidden sm:inline">
              ClarityVue
            </span>
          </Link>
        </div>

        {/* Navigation buttons - optimized for mobile */}
        <div className="flex items-center gap-0.5">
          {/* Home - icon only on very small screens */}
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 text-xs px-1.5 sm:px-2 h-8 min-w-0"
            >
              <Home className="w-3 h-3 sm:mr-1 flex-shrink-0" />
              <span className="hidden sm:inline truncate">Home</span>
            </Button>
          </Link>

          {/* New Album - icon only on very small screens */}
          <Link href="/album/new">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 text-xs px-1.5 sm:px-2 h-8 min-w-0"
            >
              <Plus className="w-3 h-3 sm:mr-1 flex-shrink-0" />
              <span className="hidden sm:inline truncate">New</span>
            </Button>
          </Link>

          {/* Profile - icon only on very small screens */}
          <Link href="/profile/edit">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 text-xs px-1.5 sm:px-2 h-8 min-w-0"
            >
              <User className="w-3 h-3 sm:mr-1 flex-shrink-0" />
              <span className="hidden sm:inline truncate">Profile</span>
            </Button>
          </Link>

          {/* View Profile - show on all screens but with different styling */}
          {profile && (
            <Link href={`/u/${profile.username}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 text-xs px-1.5 sm:px-2 h-8 min-w-0"
              >
                <Eye className="w-3 h-3 sm:mr-1 flex-shrink-0" />
                <span className="hidden sm:inline truncate">View</span>
              </Button>
            </Link>
          )}

          {/* User Button - smaller on mobile */}
          <SignedIn>
            <div className="ml-1 flex-shrink-0">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar Navigation
  const DesktopSidebar = () => (
    <div className="hidden lg:flex relative bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col flex-shrink-0">
      {/* Logo Section */}
      <div
        className={`border-b border-white/10 ${isCollapsed ? "p-2" : "p-2"}`}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/dashboard"
              className="flex justify-center items-center"
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
              className="p-1 text-white/60 hover:text-white transition-colors flex justify-center items-center"
            >
              <ChevronRight />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Button asChild variant="link">
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-base font-bold text-white truncate">
                  ClarityVue
                </span>
              </Link>
            </Button>

            <button
              onClick={toggleCollapsed}
              className="text-white/60 hover:text-white transition-colors flex justify-center items-center"
            >
              <ChevronLeft />
            </button>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-1 space-y-1">
        {isCollapsed ? (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
            >
              <Home className="w-4 h-4 flex-shrink-0" />
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start px-2"
            >
              <Home className="w-4 h-4 flex-shrink-0 mr-2" />
              <span className="truncate">Dashboard</span>
            </Button>
          </Link>
        )}

        {isCollapsed ? (
          <Link href="/album/new">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
            </Button>
          </Link>
        ) : (
          <Link href="/album/new">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start px-2"
            >
              <Plus className="w-4 h-4 flex-shrink-0 mr-2" />
              <span className="truncate">Create Album</span>
            </Button>
          </Link>
        )}

        {isCollapsed ? (
          <Link href="/profile/edit">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
            >
              <User className="w-4 h-4 flex-shrink-0" />
            </Button>
          </Link>
        ) : (
          <Link href="/profile/edit">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start px-2"
            >
              <User className="w-4 h-4 flex-shrink-0 mr-2" />
              <span className="truncate">Profile</span>
            </Button>
          </Link>
        )}

        {profile &&
          (isCollapsed ? (
            <Link href={`/u/${profile.username}`}>
              <Button
                variant="ghost"
                className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
              </Button>
            </Link>
          ) : (
            <Link href={`/u/${profile.username}`}>
              <Button
                variant="ghost"
                className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start px-2"
              >
                <Eye className="w-4 h-4 flex-shrink-0 mr-2" />
                <span className="truncate">Public Profile</span>
              </Button>
            </Link>
          ))}
      </nav>

      {/* User Section */}
      <div className="p-2 border-t border-white/10">
        <div
          className={`flex flex-row items-center p-2 rounded-lg ${
            isCollapsed ? "justify-center" : "bg-white/5 justify-start"
          }`}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
          {!isCollapsed && (
            <div className="min-w-0 flex flex-col items-start justify-center">
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
});

export default PrivateNavBar;
