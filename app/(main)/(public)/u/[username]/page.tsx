import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import { redirect } from "next/navigation";
import Image from "next/image";
import PublicProfilePreview from "@/components/PublicProfilePreview";
import { auth } from "@clerk/nextjs/server";

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
          <PublicProfilePreview
            albums={albums}
            profile={profile}
            userId={userId as string}
          />
        )}
      </div>
    </div>
  );
}
