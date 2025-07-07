import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getProfile } from "@/server/actions/profiles";
import { auth } from "@clerk/nextjs/server";

export default async function PrivateNavBar() {
  const { userId } = await auth();
  if (!userId) throw new Error();
  const profile = await getProfile(userId);
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-22 bg-neutral-900 px-6 gap-4 shadow-2xl shadow-neutral-950">
      <div className="flex flex-row items-center">
        <Link href="/dashboard" className="flex items-center gap-1 mr-4">
          <Image src="/assets/logo.png" width={70} height={70} alt="Logo" />
        </Link>
        <p className="text-white text-2xl font-semibold">ClarityVue.</p>
      </div>
      <div>
        <Button asChild variant={"link"}>
          <Link className="text-white" href="/dashboard">
            Dashboard
          </Link>
        </Button>
      </div>
      <div>
        {profile && (
          <Button asChild variant={"link"}>
            <Link className="text-white" href={"/u/" + profile.username}>
              Public Profile
            </Link>
          </Button>
        )}
      </div>
      <div>
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
