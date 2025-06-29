import { auth } from "@clerk/nextjs/server";
import NavBar from "@/components/NavBar";
import { getProfile } from "@/server/profiles";
import CreateProfileForm from "@/components/forms/CreateProfileForm";

export default async function Page() {
  const user = await auth();
  const profile = await getProfile();
  return (
    <div>
      <NavBar />
      {!profile ? (
        <CreateProfileForm />
      ) : (
        <div>
          <p>Hi {profile.displayName}!</p>
          <p>Welcome to ClearVue</p>
          <p>Your Dashboard</p>
        </div>
      )}
    </div>
  );
}
