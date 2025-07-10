import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function PublicNavBar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.svg" width={32} height={32} alt="Logo" />
          <span className="text-xl font-bold text-white">ClarityVue</span>
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <SignInButton>
              <Button
                variant="ghost"
                className="text-white hover:text-white/80 hover:bg-white/10"
              >
                Sign In
              </Button>
            </SignInButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sign in to your account</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <SignUpButton>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Get Started
              </Button>
            </SignUpButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new account</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </nav>
  );
}
