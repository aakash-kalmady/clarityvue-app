import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="w-full h-screen bg-gray-950 flex items-center justify-center gap-10 p-2 max-md:flex-col ">
      <section className="flex flex-col items-center">
        <Image src="/assets/logo.png" width={200} height={200} alt="Logo" />

        <h1 className="text-2xl font-black lg:text-3xl text-white">
          Your photos, perfectly organized
        </h1>

        <p className="font-extralight text-white">
          Join millions of professionals who easily craft photo portfolios with
          the #1 photo portfolio building tool!
        </p>

        <Image
          src="/assets/camera.svg"
          width={500}
          height={500}
          alt="Planning"
        />
      </section>
      <div className="mt-3">
        <SignIn routing="hash" />
      </div>
    </main>
  );
}
