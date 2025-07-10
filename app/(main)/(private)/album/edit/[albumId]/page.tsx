import { getAlbum } from "@/server/actions/albums";
import AlbumForm from "@/components/forms/AlbumForm";

export default async function EditAlbum({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  const album = await getAlbum(albumId);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AlbumForm album={album} />
    </div>
  );
}
