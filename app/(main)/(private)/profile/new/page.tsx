import ProfileForm from "@/components/forms/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProfilePage() {
  return (
    // Container Card component centered on the page with a max width
    <div className="flex items-center justify-center">
      <Card className="w-md border-8 border-white shadow-2xl shadow-accent-foreground">
        {/* Header section of the card displaying the title */}
        <CardHeader>
          <CardTitle>New Profile</CardTitle>
        </CardHeader>

        {/* Content section of the card containing the event form */}
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
