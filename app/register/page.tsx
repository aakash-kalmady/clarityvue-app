import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <SignUp routing="hash" />
    </main>
  );
}
