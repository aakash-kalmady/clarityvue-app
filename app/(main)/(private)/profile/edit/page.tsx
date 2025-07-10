import { getProfile } from "@/server/actions/profiles";
import { auth } from "@clerk/nextjs/server";
import ProfileForm from "@/components/forms/ProfileForm";

export default async function EditProfilePage() {
  const { userId } = await auth();
  if (!userId) throw new Error();
  const profile = await getProfile(userId);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <ProfileForm profile={profile} />
    </div>
  );
}
