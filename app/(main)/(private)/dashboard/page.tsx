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
        <Button>
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>
        <Image
          src={profile.imageUrl}
          width={100}
          height={100}
          alt="logo"
          className="rounded-full"
        />
        <p>Hi {profile.displayName}!</p>
        <p>Welcome to your ClearVue dashboard!</p>

        <Button>
          <Link href="/album/new">Create an Album</Link>
        </Button>

        {albums.length < 1 ? (
          <p>You have no albums, create one now!</p>
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
    </main>
  );
}
