import AlbumForm from "@/components/forms/AlbumForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAlbum } from "@/server/actions/albums";

export default async function EditAlbum({
  params,
}: {
  params: { albumId: string };
}) {
  const { albumId } = await params;
  const album = await getAlbum(albumId);
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md shadow-2xl shadow-black">
        {/* Header section of the card displaying the title */}
        <CardHeader>
          <CardTitle>Edit Album</CardTitle>
        </CardHeader>

        {/* Content section of the card containing the event form */}
        <CardContent>
          <AlbumForm album={album} />
        </CardContent>
      </Card>
    </div>
  );
}
