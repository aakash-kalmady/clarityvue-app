import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-22 bg-neutral-950 px-6 gap-4 shadow-2xs">
      {/* Logo */}
      <div className="flex flex-row items-center">
        <Link href="/dashboard" className="flex items-center gap-1 mr-5">
          <Image
            src="/assets/logo.png"
            width={75}
            height={75}
            alt="Let's talk"
          />
        </Link>
        <p className="text-white text-2xl font-semibold">ClearVue.</p>
      </div>

      {/* User button */}
      <div>
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
