import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";

export default async function Page() {
  const user = await currentUser();
  return (
    <div>
      <NavBar />
      <p>Hi {user?.fullName}!</p>
      <p>Welcome to ClearVue</p>
      <p>Your Dashboard</p>
    </div>
  );
}
