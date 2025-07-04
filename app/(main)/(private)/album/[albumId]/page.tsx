import { getAlbumById } from "@/server/actions/albums";
import PrivateAlbumPage from "@/components/PrivateAlbumPage";
import { auth } from "@clerk/nextjs/server";

export default async function Page({
  params,
}: {
  params: { albumId: string };
}) {
  const albumId = params.albumId;
  const album = await getAlbumById(albumId);
  const { userId } = await auth();
  if (userId !== album.clerkUserId) {
    throw new Error("User not authenticated to access this page");
  }
  return <PrivateAlbumPage album={album} />;
}
