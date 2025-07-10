import AlbumCard from "./cards/AlbumCard";
import CopyButton from "./CopyButton";

export default function PublicProfilePreview({
  albums,
  profile,
  userId,
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
  };
  userId?: string;
}) {
  const publicUrl = `${"https://clarityvue.com"}/u/${profile.username}`;
  return (
    <div className="space-y-8">
      {/* Owner Notice Section */}
      {userId === profile.clerkUserId && (
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-pink-500/20 backdrop-blur-xl border border-blue-400/30 shadow-xl"></div>
          <div className="relative p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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
              <CopyButton publicUrl={publicUrl} />
            </div>
          </div>
        </div>
      )}

      {/* Albums Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={`transition-all duration-500 animate-in slide-in-from-bottom-4 fade-in`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <AlbumCard
                title={album.title}
                description={album.description}
                albumId={album.id}
                imageUrl={album.imageUrl}
                isPrivate={false}
                username={profile.username}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
