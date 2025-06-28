import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div>
        <p>Hi {user?.firstName}!</p>
        <p>Welcome to ClearVue</p>
      </div>
    </div>
  );
}
