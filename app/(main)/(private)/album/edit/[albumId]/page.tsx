import AlbumForm from "@/components/forms/AlbumForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAlbumById } from "@/server/actions/albums";

export default async function EditAlbum({
  params,
}: {
  params: { albumId: string };
}) {
  const albumId = params.albumId;
  const album = await getAlbumById(albumId);
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-md border-8 border-amber-50 shadow-2xl shadow-accent-foreground">
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
