import { getAlbumWithUsername } from "@/server/actions/albums";
import { getImages } from "@/server/actions/images";
import { auth } from "@clerk/nextjs/server";
import PrivateAlbumPage from "@/components/PrivateAlbumPage";

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  const album = await getAlbumWithUsername(albumId);
  if (!album) {
    throw new Error("Album not found");
  }
  const { userId } = await auth();
  if (userId !== album.clerkUserId) {
    throw new Error("User not authenticated to access this page");
  }

  const images = await getImages(albumId);
  return <PrivateAlbumPage album={album} images={images} />;
}
