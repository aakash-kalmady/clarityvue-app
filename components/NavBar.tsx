import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-800 px-10 gap-4 shadow-2xl mb-28">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-1 hover:scale-150 duration-500 "
      >
        <Image src="/assets/logo.png" width={60} height={60} alt="Let's talk" />
      </Link>

      {/* User button */}
      <div className="hover:scale-150 duration-500 ">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
