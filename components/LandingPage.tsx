import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="w-full h-screen bg-zinc-900 flex items-center justify-center gap-10 p-5 max-md:flex-col ">
      <section className="flex flex-col items-center justify-center max-sm:flex-row">
        <div>
          <h1 className="text-2xl font-black lg:text-3xl text-white">
            Your photos, perfectly organized
          </h1>

          <p className="font-extralight text-white mb-5">
            Craft a photo portfolio with the best photo portfolio building tool!
          </p>
        </div>

        <Image src="/assets/logo.svg" width={150} height={150} alt="Logo" />
      </section>
      <div className="">
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
