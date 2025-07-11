/**
 * Public Profile Page: Displays a user's public profile and albums.
 *
 * This page provides:
 * - Public profile information display
 * - Album grid for public viewing
 * - Animated background elements
 * - Responsive design for all devices
 *
 * Features:
 * - Dynamic routing based on username parameter
 * - Profile data fetching and validation
 * - Album data retrieval for display
 * - Glassmorphism styling with backdrop blur
 * - Animated floating particles and background elements
 * - SEO-friendly public URLs
 *
 * @param params - Promise containing the username parameter from the URL
 * @returns Public profile page with user info and albums, or redirects if profile not found
 */
import { getAlbums } from "@/server/actions/albums";
import { getProfileByUsername } from "@/server/actions/profiles";
import { redirect } from "next/navigation";
import PublicProfilePreview from "@/components/PublicProfilePreview";

/**
 * Public profile page component that displays user information and albums.
 *
 * Flow:
 * 1. Extract username from URL parameters
 * 2. Fetch profile data by username
 * 3. Redirect to login if profile not found
 * 4. Fetch user's albums for display
 * 5. Render profile and albums with animations
 *
 * @param params - Promise containing the username parameter
 * @returns Public profile page or redirects to login
 */
export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Extract username from URL parameters
  const { username } = await params;

  // Fetch profile data by username
  const profile = await getProfileByUsername(username as string);

  // Redirect to login if profile not found
  if (!profile) {
    redirect("/login");
  }

  // Fetch user's albums for display
  const albums = await getAlbums(profile.clerkUserId);

  return <PublicProfilePreview albums={albums} profile={profile} />;
}
