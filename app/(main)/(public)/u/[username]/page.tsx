import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import { redirect } from "next/navigation";
import AlbumCard from "@/components/cards/AlbumCard";
import Image from "next/image";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfileByUsername(username as string);
  if (!profile) {
    redirect("/login");
  }
  const albums = await getAlbums(profile.clerkUserId);
  return (
    <div className="p-6">
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
      <div className="mt-5">
        {albums.length < 1 ? (
          <p className="text-2xl text-white text-center">
            {profile.displayName} has no albums, let them know to create one
            now!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
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
                  imageUrl={album.imageUrl}
                  isPrivate={false}
                  username={username}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
