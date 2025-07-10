"use client";

import { Button } from "./ui/button";
import {
  UserPen,
  Plus,
  Image as ImageIcon,
  Calendar,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import AlbumCard from "./cards/AlbumCard";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";

interface Profile {
  id: string;
  clerkUserId: string;
  displayName: string;
  username: string;
  bio: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Album {
  id: string;
  clerkUserId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  albumOrder: number;
}

interface DashboardClientProps {
  profile: Profile;
  albums: Album[];
}

export default function DashboardClient({
  profile,
  albums,
}: DashboardClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const totalImages = 0; // Placeholder - would need to query images table for each album
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* Header Section */}
      <div
        className={`relative transition-all duration-1000 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-pink-600/20 backdrop-blur-2xl border border-white/20 shadow-2xl"
          style={{ zIndex: 0 }}
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 p-6 rounded-2xl z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <Image
                src={profile.imageUrl}
                width={60}
                height={60}
                className="sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ring-4 ring-white/30 shadow-2xl transition-all duration-300 hover:scale-105"
                alt="Profile"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                Hi, {profile.displayName}! 👋
              </h1>
              <p className="text-white/70 flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                Member since {memberSince}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-sm border-white/30 bg-white/15 hover:bg-white/25 text-white transition-all duration-300 hover:scale-105"
                >
                  <Link href="/profile/edit">
                    <UserPen className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your profile information</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-sm shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/album/new">
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Create Album
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new photo album</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-400 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <Card className="group bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 border border-blue-400/30 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-blue-300/50">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-500/20">
                <ImageIcon className="w-4 h-4 text-blue-300" />
              </div>
              Total Albums
            </div>
            <div className="text-2xl font-bold text-white drop-shadow-lg mb-1">
              {albums.length}
            </div>
            <p className="text-white/60 text-xs">Photo collections</p>
          </div>
        </Card>
        <Card className="group bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 border border-emerald-400/30 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-emerald-300/50">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
              </div>
              Total Images
            </div>
            <div className="text-2xl font-bold text-white drop-shadow-lg mb-1">
              {totalImages}
            </div>
            <p className="text-white/60 text-xs">Uploaded photos</p>
          </div>
        </Card>
        <Card className="group bg-gradient-to-br from-pink-500/20 via-rose-500/15 to-purple-500/20 border border-pink-400/30 backdrop-blur-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-pink-300/50 sm:col-span-2 lg:col-span-1">
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
              <div className="p-1.5 rounded-lg bg-pink-500/20">
                <Users className="w-4 h-4 text-pink-300" />
              </div>
              Public Profile
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full text-xs border-white/30 bg-white/15 hover:bg-white/25 text-white h-8 transition-all duration-300 hover:scale-105"
                >
                  <Link href={`/u/${profile.username}`}>View Profile</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your public profile page</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </Card>
      </div>

      {/* Divider above Albums Section */}
      <div
        className={`w-full h-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-full my-6 transition-all duration-1000 delay-600 ${
          isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      />

      {/* Albums Section */}
      <div
        className={`transition-all duration-1000 delay-800 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
            Your Albums
          </h2>
          {albums.length > 0 && (
            <p className="text-white/60 text-xs sm:text-sm">
              {albums.length} album{albums.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {albums.length < 1 ? (
          <Card className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01]">
            <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto border border-white/20">
                  <ImageIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    No albums yet
                  </h3>
                  <p className="text-white/60 mb-6 max-w-md mx-auto text-sm sm:text-base">
                    Create your first album to start showcasing your photography
                    work. Organize your photos into beautiful collections.
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-sm shadow-xl transition-all duration-300 hover:scale-105"
                        size="lg"
                        asChild
                      >
                        <Link href="/album/new">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Your First Album
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Start your photo portfolio journey</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className={`transition-all duration-700 delay-${
                  1000 + index * 100
                } ${
                  isVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-10 opacity-0 scale-95"
                }`}
              >
                <AlbumCard
                  title={album.title}
                  description={album.description}
                  albumId={album.id}
                  imageUrl={album.imageUrl}
                  isPrivate={true}
                  username=""
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
