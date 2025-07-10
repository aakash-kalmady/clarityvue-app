import { auth } from "@clerk/nextjs/server";
import PrivateNavBar from "@/components/PrivateNavBar";
import PublicNavBar from "@/components/PublicNavBar";
import { getProfile } from "@/server/actions/profiles";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <PublicNavBar />
        <section className="w-full">
          {children}
        </section>
      </main>
    );
  }

  // Fetch profile data for the sidebar
  const profile = await getProfile(userId);

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <PrivateNavBar profile={profile} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
