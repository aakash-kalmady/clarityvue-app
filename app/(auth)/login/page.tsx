import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen justify-center items-center bg-neutral-900">
      <SignIn routing="hash" />
    </main>
  );
}
