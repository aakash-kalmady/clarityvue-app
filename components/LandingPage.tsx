import { SignIn } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative w-full min-h-screen bg-neutral-900 flex items-center justify-center gap-6 p-6 max-md:flex-col ">
      <section className="flex flex-col items-center justify-center gap-5 max-sm:flex-row">
        <div className="text-center">
          <h1 className="text-2xl font-black lg:text-3xl text-white">
            Your photos, perfectly organized
          </h1>

          <p className="font-extralight text-white mt-2">
            Craft a professional photo portfolio with the best photo portfolio
            building tool!
          </p>
        </div>

        <Image src="/assets/logo.svg" width={150} height={150} alt="Logo" />
      </section>
      <div className="">
        <SignIn routing="hash" />
      </div>
      <div className="bg-neutral-900/50 hover:bg-neutral-900 duration-200 absolute text-xs p-4 bottom-0 left-0 right-0 h-15 flex items-center justify-around">
        <p>&copy; AAKASH KALMADY 2025.</p>
        <Button variant="link" asChild size="sm">
          <Link href="/privacy">Privacy Policy</Link>
        </Button>
      </div>
    </main>
  );
}
