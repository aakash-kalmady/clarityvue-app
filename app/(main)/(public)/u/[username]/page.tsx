import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import AlbumCard from "@/components/cards/AlbumCard";
import Image from "next/image";

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  if (!username) throw new Error();
  const profile = await getProfileByUsername(username as string);
  if (!profile) throw new Error();
  const albums = await getAlbums(profile.clerkUserId);
  return (
    <div className="p-5">
      <div className="flex flex-row items-center">
        <Image
          src={profile.imageUrl}
          width={100}
          height={100}
          alt="logo"
          className="rounded-full mr-5"
        />
        <div>
          <h1 className="text-2xl text-white">{profile.displayName}</h1>
          <p className="text-white">{profile.bio}</p>
        </div>
      </div>
      <div className="mt-5 text-center">
        {albums.length < 1 ? (
          <p className="text-2xl text-white">
            {profile.displayName} has no albums, let them know to create one
            now!
          </p>
        ) : (
          <div className="grid grid-cols-5 gap-10">
            {albums.map((album) => (
              <div
                key={album.id}
                className="w-full h-full flex flex-col justify-center items-center"
              >
                <AlbumCard
                  key={album.id}
                  title={album.title}
                  description={album.description}
                  albumId={album.id}
                  isPrivate={false}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
