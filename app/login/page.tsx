import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <SignIn routing="hash" />
    </main>
  );
}
