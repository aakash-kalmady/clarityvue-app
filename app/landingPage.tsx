import { SignIn } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div>
      <SignIn routing="hash" />
    </div>
  );
}
