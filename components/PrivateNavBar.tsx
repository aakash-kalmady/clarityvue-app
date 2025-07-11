"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Plus,
  Home,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";

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
    <div className="lg:hidden bg-white/5 backdrop-blur-xl border-b border-white/10 fixed top-0 left-0 right-0 z-50 pt-safe-area-top">
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
            <div className="ml-1 flex-shrink-0">
              <UserButton
                appearance={{
                  elements: {
                    userButtonPopoverCard:
                      "bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl",
                    userButtonPopoverActionButton:
                      "text-slate-900 hover:bg-white/40",
                    userButtonPopoverActionButtonIcon: "text-slate-900",
                    userButtonPopoverActionButtonText: "text-slate-900",
                    userButtonPopoverFooter: "text-slate-700",
                    userButtonPopoverHeader: "text-slate-900",
                    userButtonPopoverHeaderTitle: "text-slate-900",
                    userButtonPopoverHeaderSubtitle: "text-slate-700",
                    userButtonPopoverActionButton__manageAccount:
                      "text-blue-600",
                    userButtonPopoverActionButton__signOut: "text-pink-600",
                  },
                  variables: {
                    colorPrimary: "#6366f1",
                    colorBackground: "rgba(255,255,255,0.3)",
                    colorText: "#0f172a",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar Navigation
  const DesktopSidebar = () => (
    <div className="hidden lg:flex relative bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col transition-all duration-300">
      {/* Logo Section */}
      <div className={"border-b border-white/10 py-4 px-2 "}>
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-between">
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
              className="mt-4 text-white/60 hover:text-white transition-colors flex justify-center items-center"
            >
              <ArrowRightToLine />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <Button asChild variant="link">
              <Link href="/dashboard" className="flex items-center gap-2">
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
        {isCollapsed ? (
          <Link href="/dashboard">
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

        {isCollapsed ? (
          <Link href="/album/new">
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

        {profile &&
          (isCollapsed ? (
            <Link href={`/u/${profile.username}`}>
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

      {/* User Section */}
      <div className="p-2 border-t">
        <div
          className={`flex flex-row items-center p-2 rounded-full bg-white/5  ${
            isCollapsed ? "justify-center" : "justify-start"
          }`}
        >
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverCard:
                    "bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl",
                  userButtonPopoverActionButton:
                    "text-slate-900 hover:bg-white/40",
                  userButtonPopoverActionButtonIcon: "text-slate-900",
                  userButtonPopoverActionButtonText: "text-slate-900",
                  userButtonPopoverFooter: "text-slate-700",
                  userButtonPopoverHeader: "text-slate-900",
                  userButtonPopoverHeaderTitle: "text-slate-900",
                  userButtonPopoverHeaderSubtitle: "text-slate-700",
                  userButtonPopoverActionButton__manageAccount: "text-blue-600",
                  userButtonPopoverActionButton__signOut: "text-pink-600",
                },
                variables: {
                  colorPrimary: "#6366f1",
                  colorBackground: "rgba(255,255,255,0.3)",
                  colorText: "#0f172a",
                },
              }}
            />
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
});

export default PrivateNavBar;
