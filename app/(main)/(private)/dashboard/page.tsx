import { getProfile } from "@/server/actions/profiles";
import { getAlbums } from "@/server/actions/albums";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import AlbumCard from "@/components/cards/AlbumCard";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) throw new Error();
  const profile = await getProfile(userId);
  if (!profile) return redirect("/profile/new");
  const albums = await getAlbums(profile.clerkUserId);
  return (
    <main className="p-8">
      <div className="flex flex-row items-center">
        <Image
          src={profile.imageUrl}
          width={100}
          height={100}
          alt="logo"
          className="rounded-full mr-5"
        />
        <div>
          <h1 className="text-2xl text-white">Hi {profile.displayName}!</h1>
          <div className="flex flex-row items-center">
            <p className="text-white">
              User since {profile.createdAt.toLocaleDateString()}
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant={"link"}>
                  <Link href="/profile/edit">
                    <UserPen color="white" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Profile</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Button className="mt-3" variant={"secondary"} size="lg" asChild>
          <Link href="/album/new">Create an Album</Link>
        </Button>
      </div>
      {albums.length < 1 ? (
        <p className="text-white text-3xl mt-5 text-center">
          You have no albums, create one now!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5">
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
                isPrivate={true}
                username=""
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
