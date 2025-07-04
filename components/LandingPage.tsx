import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="w-full h-screen bg-neutral-900 flex items-center justify-center gap-10 p-2 max-md:flex-col ">
      <section className="flex flex-col items-center justify-center">
        <Image src="/assets/logo.png" width={250} height={250} alt="Logo" />

        <h1 className="text-2xl font-black lg:text-3xl text-white">
          Your photos, perfectly organized
        </h1>

        <p className="font-extralight text-white">
          Easily craft a photo portfolio with the #1 photo portfolio building
          tool!
        </p>

        <Image
          src="/assets/camera.svg"
          width={400}
          height={400}
          alt="Planning"
        />
      </section>
      <div className="">
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
