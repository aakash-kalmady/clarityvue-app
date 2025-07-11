/**
 * PublicProfilePreview: Displays a user's public profile with albums grid.
 *
 * This component provides:
 * - Owner notice section for profile owners
 * - Albums grid with staggered animations
 * - Copy link functionality for sharing
 * - Responsive design for all screen sizes
 *
 * Features:
 * - Owner detection and conditional UI
 * - Public URL generation for sharing
 * - Copy button integration
 * - Staggered animations for albums
 * - Responsive grid layout
 * - Glassmorphism styling
 *
 * Owner Detection:
 * - Compares current user ID with profile owner
 * - Shows owner notice only to profile owner
 * - Provides copy link functionality for sharing
 *
 * @param albums - Array of user's albums to display
 * @param profile - User profile data for owner detection
 *
 * @example
 * <PublicProfilePreview
 *   albums={[{ id: "1", title: "Vacation", description: "Summer pics", imageUrl: "url" }]}
 *   profile={{ displayName: "John", username: "john", bio: "Photographer", clerkUserId: "user_123" }}
 * />
 */
import { auth } from "@clerk/nextjs/server";
import AlbumCard from "./cards/AlbumCard";
import CopyButton from "./CopyButton";
import Image from "next/image";
import { Badge } from "./ui/badge";

/**
 * Public profile preview component for displaying user albums.
 *
 * Functionality:
 * - Detects if current user is profile owner
 * - Shows owner notice with copy link functionality
 * - Displays albums grid with animations
 * - Handles responsive layout for different screen sizes
 *
 * @param albums - Array of albums to display
 * @param profile - User profile data
 * @returns Public profile preview with albums and owner features
 */
export default async function PublicProfilePreview({
  albums,
  profile,
}: {
  albums: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  profile: {
    displayName: string;
    username: string;
    bio: string;
    clerkUserId: string;
    imageUrl: string;
  };
}) {
  // Get current user ID for owner detection
  const { userId } = await auth();
  const { username, clerkUserId } = profile;

  // Generate public URL for sharing
  const publicUrl = `${"https://clarityvue.com"}/u/${username}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements - Creates depth and visual interest */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-bounce" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />

      {/* Floating Particles - Adds dynamic movement to background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => {
          // Generate deterministic positions using seed-based algorithm
          const seed = i * 12345;
          const left = (((seed * 9301 + 49297) % 233280) / 233280) * 100;
          const top = (((seed * 49297 + 9301) % 233280) / 233280) * 100;
          const delay = (((seed * 49297 + 49297) % 233280) / 233280) * 3;
          const duration = 3 + (((seed * 9301 + 9301) % 233280) / 233280) * 2;

          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content Area - Profile and albums display */}
      <div className="relative z-10 p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Profile Header Section - User information display */}
        <div className="mb-8 sm:mb-12">
          <div className="relative">
            {/* Glassmorphism background for profile section */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"></div>

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                {/* Profile Image - User's profile picture */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={profile.imageUrl}
                    width={120}
                    height={120}
                    alt={`${profile.displayName}&apos;s profile`}
                    className="object-cover rounded-full ring-4 ring-white/30 shadow-2xl transition-all duration-300 hover:scale-105"
                  />
                </div>

                {/* Profile Information - Name, username, bio, and stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                      {profile.displayName}
                    </h1>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    >
                      @{profile.username}
                    </Badge>
                  </div>

                  {/* User bio (if provided) */}
                  {profile.bio && (
                    <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                      {profile.bio}
                    </p>
                  )}

                  {/* Album count display */}
                  <div className="flex items-center gap-4 mt-4 text-white/60 text-sm">
                    <span className="flex items-center gap-2">
                      {albums.length} album{albums.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Albums Section - Displays user's albums or empty state */}
        <div className="relative">
          {albums.length < 1 ? (
            /* Empty state when user has no albums */
            <div className="text-center py-12">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl"></div>
                <div className="relative p-8">
                  {/* Empty state icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white/60"
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

                  {/* Empty state text */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No albums yet
                  </h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    {profile.displayName} hasn&apos;t created any albums yet.
                    Check back later!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Albums grid display using PublicProfilePreview component */
            <div className="space-y-8">
              {/* Owner Notice Section - Only shown to profile owner */}
              {userId === profile.clerkUserId && (
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 backdrop-blur-xl border border-blue-400/30 shadow-xl"></div>
                  <div className="relative p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Owner notice icon */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-blue-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <span className="text-white/90 text-base sm:text-lg font-medium">
                          This is what your profile looks like to others
                        </span>
                      </div>

                      {/* Copy link button for sharing */}
                      <CopyButton publicUrl={publicUrl} />
                    </div>
                  </div>
                </div>
              )}

              {/* Albums Grid - Displays user's albums with animations */}
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {albums.map((album, index) => (
                    <div
                      key={album.id}
                      className={`transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <AlbumCard
                        album={album}
                        isPrivate={false}
                        username={username}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
