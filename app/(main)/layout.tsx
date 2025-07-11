/**
 * Main Layout: Layout component that handles authentication-based routing and navigation.
 *
 * This component provides:
 * - Authentication state checking via Clerk
 * - Conditional rendering based on user authentication
 * - Public navigation for unauthenticated users
 * - Private navigation with sidebar for authenticated users
 * - Responsive design for mobile and desktop layouts
 *
 * Features:
 * - Server-side authentication checking
 * - Profile data fetching for sidebar
 * - Glassmorphism styling with backdrop blur
 * - Mobile-first responsive design
 * - Gradient background overlays
 *
 * @param children - React components to be rendered within the layout
 */
import { auth } from "@clerk/nextjs/server";
import PrivateNavBar from "@/components/PrivateNavBar";
import PublicNavBar from "@/components/PublicNavBar";
import { getProfile } from "@/server/actions/profiles";

/**
 * Main layout component that handles authentication-based routing.
 *
 * Routes:
 * - Unauthenticated users: Public layout with PublicNavBar
 * - Authenticated users: Private layout with PrivateNavBar and sidebar
 *
 * @param children - React components to be rendered within the layout
 */
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check authentication status using Clerk
  const { userId } = await auth();

  // Render public layout for unauthenticated users
  if (!userId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <PublicNavBar />
        <section className="w-full">{children}</section>
      </main>
    );
  }

  // Fetch user profile data for the private sidebar
  const profile = await getProfile(userId);

  // Render private layout for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Subtle background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 via-slate-600/5 to-slate-700/10"></div>

      {/* Mobile Layout - Stacked navigation and content */}
      <div className="lg:hidden flex flex-col min-h-screen">
        <PrivateNavBar profile={profile} />
        <div className="flex-1 overflow-auto relative z-10 pb-safe-area-bottom pt-14">
          {children}
        </div>
      </div>

      {/* Desktop Layout - Sidebar with main content area */}
      <div className="hidden lg:flex h-screen">
        <PrivateNavBar profile={profile} />
        <div className="flex-1 flex flex-col relative z-10">
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
