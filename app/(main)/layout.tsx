import { auth } from "@clerk/nextjs/server";
import PrivateNavBar from "@/components/PrivateNavBar";
import PublicNavBar from "@/components/PublicNavBar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return (
    <main className="flex">
      {/*render privatenavbar if user exists, otherwise public navbar  */}
      {userId ? <PrivateNavBar /> : <PublicNavBar />}
      {/* render the children*/}
      <section className={"bg-neutral-900 pt-15 w-full min-h-screen"}>
        {children}
      </section>
    </main>
  );
}
