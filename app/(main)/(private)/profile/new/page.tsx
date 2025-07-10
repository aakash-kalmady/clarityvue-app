import ProfileForm from "@/components/forms/ProfileForm";

export default async function NewProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <ProfileForm />
    </div>
  );
}
