"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, Plus, ChevronLeft, ChevronRight, Eye, Home } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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

  return (
    <div
      className={`relative bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col transition-[width] duration-300 ease-out ${
        isCollapsed ? "w-16" : "w-52"
      }`}
    >
      {/* Logo Section */}
      <div
        className={`border-b border-white/10 ${isCollapsed ? "p-2" : "p-2"}`}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-center gap-2">
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

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleCollapsed}
                  className="p-1 text-white/60 hover:text-white transition-colors flex justify-center items-center"
                >
                  <ChevronRight />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Expand sidebar</p>
              </TooltipContent>
            </Tooltip>
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

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleCollapsed}
                  className="text-white/60 hover:text-white transition-colors flex justify-center items-center"
                >
                  <ChevronLeft />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Collapse sidebar</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-1 space-y-1">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
                >
                  <Home className="w-4 h-4 flex-shrink-0" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start"
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Dashboard</span>
            </Button>
          </Link>
        )}

        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/album/new">
                <Button
                  variant="ghost"
                  className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create Album</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link href="/album/new">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start"
            >
              <Plus className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Create Album</span>
            </Button>
          </Link>
        )}

        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/profile/edit">
                <Button
                  variant="ghost"
                  className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
                >
                  <User className="w-4 h-4 flex-shrink-0" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link href="/profile/edit">
            <Button
              variant="ghost"
              className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start"
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">Profile</span>
            </Button>
          </Link>
        )}

        {profile &&
          (isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/u/${profile.username}`}>
                  <Button
                    variant="ghost"
                    className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-center"
                  >
                    <Eye className="w-4 h-4 flex-shrink-0" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Public Profile</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link href={`/u/${profile.username}`}>
              <Button
                variant="ghost"
                className="w-full flex text-white hover:bg-white/10 hover:text-white text-sm justify-start"
              >
                <Eye className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Public Profile</span>
              </Button>
            </Link>
          ))}
      </nav>

      {/* User Section */}
      <div className="p-2 border-t border-white/10">
        <div
          className={`flex flex-row items-center p-2 rounded-lg ${
            isCollapsed ? "justify-center" : "bg-white/5"
          }`}
        >
          <div className="flex-shrink-0 flex items-center justify-center">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-6 h-6",
                    userButtonPopoverCard:
                      "bg-white/10 backdrop-blur-xl border border-white/20",
                    userButtonPopoverActionButton:
                      "text-white hover:bg-white/10",
                    userButtonPopoverActionButtonText: "text-white",
                    userButtonPopoverFooter: "border-white/10",
                  },
                }}
              />
            </SignedIn>
          </div>
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
});

export default PrivateNavBar;
