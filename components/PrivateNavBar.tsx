import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { getProfile } from "@/server/actions/profiles";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function PrivateNavBar() {
  const { userId } = await auth();
  if (!userId) throw new Error();
  const profile = await getProfile(userId);
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-15 bg-neutral-900 px-6 shadow-xl shadow-neutral-950">
      <div className="flex flex-row items-center">
        <Link href="/dashboard" className="flex items-center gap-1 mr-4">
          <Image src="/assets/logo.svg" width={40} height={40} alt="Logo" />
        </Link>
        <p className="text-white text-2xl font-semibold">ClarityVue</p>
      </div>
      <Button asChild variant={"link"}>
        <Link className="text-white" href="/dashboard">
          Dashboard
        </Link>
      </Button>
      {profile && (
        <Button asChild variant={"link"}>
          <Link className="text-white" href={"/u/" + profile.username}>
            Public Profile
          </Link>
        </Button>
      )}
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
    </nav>
  );
}
