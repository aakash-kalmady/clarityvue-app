import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import AlbumCard from "@/components/cards/AlbumCard";

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  if (!username) throw new Error();
  const profile = await getProfileByUsername(username as string);
  if (!profile) throw new Error();
  const albums = await getAlbums(profile.clerkUserId);
  return (
    <div>
      <p>{profile.displayName}</p>
      <p>{profile.bio}</p>
      <p>{profile.createdAt.toString()}</p>
      {albums.length < 1 ? (
        <p>
          {profile.displayName} has no albums, let them know to create one now!
        </p>
      ) : (
        <div className="flex flex-row gap-1">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              description={album.description}
              albumId={album.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
