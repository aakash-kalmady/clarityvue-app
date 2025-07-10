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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <AlbumForm album={album} />
    </div>
  );
}
