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
      <section className={userId ? "pt-28" : ""}>{children}</section>
    </main>
  );
}
