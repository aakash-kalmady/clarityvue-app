import {
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function PublicNavBar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-22 bg-neutral-900 px-6 gap-4 shadow-2xs">
      {/* Logo */}
      <div className="flex flex-row items-center">
        <Link href="/" className="flex items-center gap-1 mr-5">
          <Image src="/assets/logo.png" width={70} height={70} alt="Logo" />
        </Link>
        <p className="text-white text-2xl font-semibold">ClarityVue.</p>
      </div>

      {/* User button */}
      <div>
        <div className="flex flex-1 max-sm:gap-0 sm:gap-6">
          <SignInButton>
            <Button className="cursor-pointer mr-1 text-white" variant={"link"}>
              Login
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="cursor-pointer text-white" variant={"link"}>
              Register
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
}
