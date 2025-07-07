import ProfileForm from "@/components/forms/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";

export default async function NewProfilePage() {
  return (
    // Container Card component centered on the page with a max width
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md shadow-2xl shadow-black">
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
