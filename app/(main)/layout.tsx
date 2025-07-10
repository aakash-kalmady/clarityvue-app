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
        <section className="w-full">{children}</section>
      </main>
    );
  }

  // Fetch profile data for the sidebar
  const profile = await getProfile(userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-slate-600/5 to-slate-700/10"></div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <PrivateNavBar profile={profile} />
        <div className="flex-1 overflow-auto relative z-10 pb-safe-area-bottom pt-16">
          {children}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        <PrivateNavBar profile={profile} />
        <div className="flex-1 flex flex-col relative z-10">
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
