import { getAlbumById } from "@/server/actions/albums";
import PublicAlbumPage from "@/components/PublicAlbumPage";

export default async function Page({
  params,
}: {
  params: { albumId: string };
}) {
  const { albumId } = params;
  const album = await getAlbumById(albumId);
  return <PublicAlbumPage album={album} />;
}
