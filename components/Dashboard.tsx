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
import Image from "next/image";
import Link from "next/link";
import AlbumCard from "./cards/AlbumCard";
import { Card } from "./ui/card";

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

interface DashboardProps {
  profile: Profile;
  albums: Album[];
}

export default function Dashboard({ profile, albums }: DashboardProps) {
  const totalImages = 0; // Placeholder - would need to query images table for each album
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* Header Section */}
      <div className="relative transition-all duration-1000 delay-200 opacity-0 animate-[fadeIn_1s_ease-out_0.2s_forwards]">
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900/80 via-blue-900/40 to-indigo-900/60 backdrop-blur-2xl border border-slate-700/50 shadow-2xl"
          style={{ zIndex: 0 }}
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 p-6 rounded-2xl z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <Image
                src={profile.imageUrl}
                width={60}
                height={60}
                className="sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ring-4 ring-slate-600/50 shadow-2xl transition-all duration-300 hover:scale-105"
                alt="Profile"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2 drop-shadow-lg">
                Hi, {profile.displayName}! 👋
              </h1>
              <p className="text-slate-300 flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                Member since {memberSince}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-sm border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 transition-all duration-300 hover:scale-105"
            >
              <Link href="/profile/edit">
                <UserPen className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-slate-100 text-sm shadow-xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/album/new">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Create Album
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-400 opacity-0 animate-[fadeIn_1s_ease-out_0.4s_forwards]">
        <Card className="group bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 border border-slate-600/50 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.03] transition-all duration-300 hover:border-slate-500/70">
          <div className="px-5">
            <div className="flex items-center gap-2 text-base text-slate-200 mb-2">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <ImageIcon className="w-5 h-5 text-blue-300" />
              </div>
              Total Albums
            </div>
            <div className="text-3xl font-extrabold text-slate-100 drop-shadow-lg mb-1">
              {albums.length}
            </div>
            <p className="text-slate-400 text-xs">Photo collections</p>
          </div>
        </Card>
        <Card className="group bg-gradient-to-br from-slate-800/60 via-indigo-900/30 to-purple-900/40 border border-slate-600/50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.03] transition-all duration-300 hover:border-slate-500/70">
          <div className="px-5">
            <div className="flex items-center gap-2 text-base text-slate-200 mb-2">
              <div className="p-2 rounded-lg bg-indigo-600/20">
                <TrendingUp className="w-5 h-5 text-indigo-300" />
              </div>
              Total Images
            </div>
            <div className="text-3xl font-extrabold text-slate-100 drop-shadow-lg mb-1">
              {totalImages}
            </div>
            <p className="text-slate-400 text-xs">Uploaded photos</p>
          </div>
        </Card>
        <Card className="group bg-gradient-to-br from-slate-800/60 via-purple-900/30 to-blue-900/40 border border-slate-600/50 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.03] transition-all duration-300 hover:border-slate-500/70 sm:col-span-2 lg:col-span-1">
          <div className="px-5">
            <div className="flex items-center gap-2 text-base text-slate-200 mb-2">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <Users className="w-5 h-5 text-purple-300" />
              </div>
              Public Profile
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="w-full text-sm border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 h-9 transition-all duration-300 hover:scale-105 rounded-xl font-semibold"
            >
              <Link href={`/u/${profile.username}`}>View Profile</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Divider above Albums Section */}

      {/* Albums Section */}
      <div className="transition-all duration-1000 delay-800 opacity-0 mb-8 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
        <div className="w-full h-1 bg-gradient-to-r from-slate-600/80 via-blue-600/80 to-indigo-600/80 rounded-full mb-4 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]" />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-100 drop-shadow-lg">
            Your Albums
          </h2>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Sparkles className="w-4 h-4" />
            <span>
              {albums.length} collection{albums.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-12">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 backdrop-blur-xl border border-slate-600/50 shadow-xl"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">
                  No albums yet
                </h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Create your first album to start sharing your photos with the
                  world.
                </p>
                <div className="mt-6">
                  <Button
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-slate-100 shadow-xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link href="/album/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Album
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album, index) => (
              <div
                key={album.id}
                className="transition-all duration-500 opacity-0 translate-y-8"
                style={{
                  animation: `fadeIn 0.8s ease-out ${
                    0.8 + index * 0.1
                  }s forwards`,
                }}
              >
                <AlbumCard
                  title={album.title}
                  description={album.description}
                  albumId={album.id}
                  imageUrl={album.imageUrl}
                  isPrivate={true}
                  username={profile.username}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
