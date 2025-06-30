import { auth } from "@clerk/nextjs/server";
import NavBar from "@/components/NavBar";
import { getProfile } from "@/server/profiles";
import CreateProfileForm from "@/components/forms/CreateProfileForm";
import Image from "next/image";
import CreateImageForm from "@/components/forms/CreateImageForm";

export default async function Page() {
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
          <Image src={profile.imageUrl} width={100} height={100} alt="logo" />
          <CreateImageForm />
        </div>
      )}
    </div>
  );
}
