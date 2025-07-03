import AlbumForm from "@/components/forms/AlbumForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewAlbum() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-md border-8 border-white shadow-2xl shadow-accent-foreground">
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
