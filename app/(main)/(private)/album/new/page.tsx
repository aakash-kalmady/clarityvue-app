import AlbumForm from "@/components/forms/AlbumForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewAlbum() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-md shadow-2xl shadow-black">
        {/* Header section of the card displaying the title */}
        <CardHeader>
          <CardTitle>New Album</CardTitle>
        </CardHeader>

        {/* Content section of the card containing the event form */}
        <CardContent>
          <AlbumForm />
        </CardContent>
      </Card>
    </div>
  );
}
