import { auth } from "@clerk/nextjs/server";
import NavBar from "@/components/NavBar";
import { getProfile } from "@/server/actions/profiles";
import CreateProfileForm from "@/components/forms/profileForms/CreateProfileForm";
import Image from "next/image";
import CreateImageForm from "@/components/forms/imageForms/CreateImageForm";
import DeleteImageForm from "@/components/forms/imageForms/DeleteImageForm";
import getAlbums from "@/server/actions/albums";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const profile = await getProfile();
  const albums = await getAlbums();
  return (
    <main className="w-screen h-screen">
      <NavBar />
      <div className="p-5">
        {!profile ? (
          <CreateProfileForm />
        ) : (
          <div>
            <Image
              src={profile.imageUrl}
              width={100}
              height={100}
              alt="logo"
              className="rounded-full"
            />
            <p>Hi {profile.displayName}!</p>
            <p>Welcome to your ClearVue dashboard!</p>

            <Link href="/dashboard/album/new">Create an Album</Link>
            {albums.length < 1 ? (
              <p>You have no albums, create one now!</p>
            ) : (
              <div>
                {albums.map((album) => (
                  <div key={album.id}>{album.title}</div>
                ))}
              </div>
            )}
            <CreateImageForm />
            <DeleteImageForm />
          </div>
        )}
      </div>
    </main>
  );
}
