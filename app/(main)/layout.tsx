import { auth } from "@clerk/nextjs/server";
import NavBar from "@/components/NavBar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  return (
    <main className="relative">
      {/*render privatenavbar if user exists, otherwise public navbar  */}
      {userId && <NavBar />}
      {/* render the children*/}
      <section
        className={
          userId
            ? "pt-22 bg-neutral-950 w-full min-h-screen"
            : "bg-neutral-950 w-full min-h-screen"
        }
      >
        {children}
      </section>
    </main>
  );
}
