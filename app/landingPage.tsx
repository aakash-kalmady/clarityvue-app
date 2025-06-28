import { SignIn } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to ClearVue!</h1>
      <SignIn routing="hash" />
    </div>
  );
}
