import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const user = await currentUser();
  return (
    <div>
      <nav className="flex items-center p-4 w-full bg-gray-500">
        <div>
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:scale-150 duration-500 "
          >
            <Image
              src="/assets/logo.svg"
              width={60}
              height={60}
              alt="Let's talk"
            />
          </Link>
        </div>
        <div className="ml-auto">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div>
        <p>Hi {user?.fullName}!</p>
        <p>Welcome to ClearVue</p>
        <p>Your Dashboard</p>
      </div>
    </div>
  );
}
