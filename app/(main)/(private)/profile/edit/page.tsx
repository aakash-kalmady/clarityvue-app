import ProfileForm from "@/components/forms/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile } from "@/server/actions/profiles";
import { auth } from "@clerk/nextjs/server";

export default async function EditProfilePage() {
  const { userId } = await auth();
  if (!userId) throw new Error();
  const profile = await getProfile(userId);
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-md shadow-2xl shadow-black">
        {/* Header section of the card displaying the title */}
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>

        {/* Content section of the card containing the event form */}
        <CardContent>
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
