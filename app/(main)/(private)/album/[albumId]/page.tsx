import { getAlbum } from "@/server/actions/albums";
import PrivateAlbumPage from "@/components/PrivateAlbumPage";
import { auth } from "@clerk/nextjs/server";

interface AlbumPageParams {
  albumId: string;
}
interface PageProps {
  params: Promise<AlbumPageParams>; // params is now a Promise
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { albumId } = resolvedParams;
  const album = await getAlbum(albumId);
  if (!album) {
    throw new Error("Album not found");
  }
  const { userId } = await auth();
  if (userId !== album.clerkUserId) {
    throw new Error("User not authenticated to access this page");
  }
  return <PrivateAlbumPage album={album} />;
}
