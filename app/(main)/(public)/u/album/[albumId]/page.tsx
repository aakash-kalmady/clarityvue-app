import { getAlbum } from "@/server/actions/albums";
import PublicAlbumPage from "@/components/PublicAlbumPage";

export default async function Page({
  params,
}: {
  params: { albumId: string };
}) {
  const { albumId } = await params;
  const album = await getAlbum(albumId);
  if (!album) {
    throw new Error("Album not found");
  }
  return <PublicAlbumPage album={album} />;
}
