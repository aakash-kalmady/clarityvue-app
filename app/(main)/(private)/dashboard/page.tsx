import { getProfile } from "@/server/actions/profiles";
import { getAlbums } from "@/server/actions/albums";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import AlbumCard from "@/components/cards/AlbumCard";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) throw new Error();
  const profile = await getProfile(userId);
  if (!profile) return redirect("/profile/new");
  const albums = await getAlbums(profile.clerkUserId);
  return (
    <main className="p-5">
      <div>
        <div className="flex flex-row">
          <Image
            src={profile.imageUrl}
            width={100}
            height={100}
            alt="logo"
            className="rounded-full mr-5"
          />
          <div>
            <h1 className="text-2xl text-white">Hi {profile.displayName}!</h1>
            <h2 className="text-white">Welcome to your dashboard</h2>
            <Button className="mt-3">
              <Link href="/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button className="mt-5" variant={"secondary"} size="lg">
            <Link href="/album/new">Create an Album</Link>
          </Button>
          {albums.length < 1 ? (
            <p className="text-white text-3xl mt-5">
              You have no albums, create one now!
            </p>
          ) : (
            <div className="grid grid-cols-5 gap-10 mt-5">
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
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
