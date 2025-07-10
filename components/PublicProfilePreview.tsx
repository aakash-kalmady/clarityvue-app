"use client";

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
    <div className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {userId === profile.clerkUserId && (
          <div className="flex items-center gap-3">
            <span className="text-white/80 text-base sm:text-lg font-medium">
              This is what your profile looks like to others
            </span>
            <CopyButton publicUrl={publicUrl} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 animate-fade-in">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            title={album.title}
            description={album.description}
            albumId={album.id}
            imageUrl={album.imageUrl}
            isPrivate={false}
            username={profile.username}
          />
        ))}
      </div>
    </div>
  );
}
