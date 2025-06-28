import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <main>
      <SignUp routing="hash" />
    </main>
  );
}
