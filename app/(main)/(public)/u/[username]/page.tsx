/**
 * Public Profile Page: Displays a user's public profile and albums.
 *
 * This page provides:
 * - Public profile information display
 * - Album grid for public viewing
 * - Animated background elements
 * - Responsive design for all devices
 *
 * Features:
 * - Dynamic routing based on username parameter
 * - Profile data fetching and validation
 * - Album data retrieval for display
 * - Glassmorphism styling with backdrop blur
 * - Animated floating particles and background elements
 * - SEO-friendly public URLs
 *
 * @param params - Promise containing the username parameter from the URL
 * @returns Public profile page with user info and albums, or redirects if profile not found
 */
import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import { redirect } from "next/navigation";
import Image from "next/image";
import PublicProfilePreview from "@/components/PublicProfilePreview";
import { Badge } from "@/components/ui/badge";

/**
 * Public profile page component that displays user information and albums.
 *
 * Flow:
 * 1. Extract username from URL parameters
 * 2. Fetch profile data by username
 * 3. Redirect to login if profile not found
 * 4. Fetch user's albums for display
 * 5. Render profile and albums with animations
 *
 * @param params - Promise containing the username parameter
 * @returns Public profile page or redirects to login
 */
export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Extract username from URL parameters
  const { username } = await params;

  // Fetch profile data by username
  const profile = await getProfileByUsername(username as string);

  // Redirect to login if profile not found
  if (!profile) {
    redirect("/login");
  }

  // Fetch user's albums for display
  const albums = await getAlbums(profile.clerkUserId);

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
                    className="rounded-full ring-4 ring-white/30 shadow-2xl transition-all duration-300 hover:scale-105"
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
            <PublicProfilePreview albums={albums} profile={profile} />
          )}
        </div>
      </div>
    </div>
  );
}
