import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import { redirect } from "next/navigation";
import Image from "next/image";
import PublicProfilePreview from "@/components/PublicProfilePreview";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfileByUsername(username as string);
  const { userId } = await auth();
  if (!profile) {
    redirect("/login");
  }
  const albums = await getAlbums(profile.clerkUserId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-bounce" />
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 sm:p-8 max-w-7xl mx-auto">
        {/* Profile Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="relative">
            {/* Glassy background for profile section */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"></div>

            <div className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
                {/* Profile Image */}
                <div className="relative flex-shrink-0">
                  <Image
                    src={profile.imageUrl}
                    width={120}
                    height={120}
                    alt={`${profile.displayName}&apos;s profile`}
                    className="rounded-full ring-4 ring-white/30 shadow-2xl transition-all duration-300 hover:scale-105"
                  />
                </div>

                {/* Profile Info */}
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

                  {profile.bio && (
                    <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                      {profile.bio}
                    </p>
                  )}

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

        {/* Albums Section */}
        <div className="relative">
          {albums.length < 1 ? (
            <div className="text-center py-12">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl"></div>
                <div className="relative p-8">
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
            <PublicProfilePreview
              albums={albums}
              profile={profile}
              userId={userId as string}
            />
          )}
        </div>
      </div>
    </div>
  );
}
