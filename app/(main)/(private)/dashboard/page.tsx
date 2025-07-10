import { getProfile } from "@/server/actions/profiles";
import { getAlbums } from "@/server/actions/albums";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Dashboard from "@/components/Dashboard";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) throw new Error();

  const profile = await getProfile(userId);
  if (!profile) return redirect("/profile/new");

  const albums = await getAlbums(profile.clerkUserId);

  return <Dashboard profile={profile} albums={albums} />;
}
