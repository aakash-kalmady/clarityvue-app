import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  return (
    <nav className="flex items-center p-4 w-full bg-gray-700">
      <div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1 hover:scale-150 duration-500 "
        >
          <Image
            src="/assets/logo.png"
            width={100}
            height={100}
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
  );
}
