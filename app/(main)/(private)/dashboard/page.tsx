/**
 * Dashboard Page: Main authenticated user dashboard.
 *
 * This page provides:
 * - User profile data validation and fetching
 * - Album data retrieval for display
 * - Image count statistics
 * - Authentication-based access control
 * - Automatic redirects for incomplete profiles
 *
 * Features:
 * - Server-side authentication checking
 * - Profile completion validation
 * - Album and image data aggregation
 * - Error handling for missing data
 * - Seamless integration with Dashboard component
 *
 * Authentication Flow:
 * 1. Check if user is authenticated using Clerk
 * 2. Fetch user's profile data
 * 3. Redirect to profile creation if no profile exists
 * 4. Fetch user's albums and image count
 * 5. Render dashboard with all data
 *
 * @returns Dashboard component with user data or redirects to profile creation
 */
import { getProfile } from "@/server/actions/profiles";
import { getAlbums } from "@/server/actions/albums";
import { getUserImageCount } from "@/server/actions/images";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Dashboard from "@/components/Dashboard";

/**
 * Dashboard page component that handles authenticated user experience.
 *
 * Data Flow:
 * 1. Authenticate user with Clerk
 * 2. Fetch user profile from database
 * 3. Redirect to profile creation if profile doesn't exist
 * 4. Fetch user's albums and total image count
 * 5. Pass all data to Dashboard component for rendering
 *
 * Error Handling:
 * - Throws error if user is not authenticated
 * - Redirects to profile creation if profile is missing
 * - Handles missing data gracefully
 *
 * @returns Dashboard component with user data or redirects appropriately
 */
export default async function Page() {
  // ===== AUTHENTICATION CHECK =====
  const { userId } = await auth();
  if (!userId) throw new Error();

  // ===== PROFILE VALIDATION =====
  const profile = await getProfile(userId);
  if (!profile) return redirect("/profile/new");

  // ===== DATA FETCHING =====
  const albums = await getAlbums(profile.clerkUserId);
  const totalImages = await getUserImageCount(profile.clerkUserId);

  // ===== RENDER =====
  return (
    <Dashboard profile={profile} albums={albums} totalImages={totalImages} />
  );
}
