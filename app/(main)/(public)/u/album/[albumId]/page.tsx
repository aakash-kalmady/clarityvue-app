import { getAlbum } from "@/server/actions/albums";
import PublicAlbumPage from "@/components/PublicAlbumPage";

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
  return <PublicAlbumPage album={album} />;
}
