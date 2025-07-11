/**
 * Edit Profile Page: Page for editing an existing user profile.
 *
 * This page provides:
 * - Full-screen form for profile editing
 * - Pre-populated form with existing user data
 * - Authentication-based access control
 * - Integration with ProfileForm component
 *
 * Features:
 * - Server-side authentication checking
 * - Profile data fetching and validation
 * - Pre-filled form fields with current data
 * - Responsive design with centered content
 * - Seamless integration with profile editing flow
 *
 * Authentication Flow:
 * 1. Check if user is authenticated using Clerk
 * 2. Fetch user's existing profile data
 * 3. Pass profile data to ProfileForm for editing
 * 4. Handle form submission and updates
 *
 * @returns ProfileForm component with existing profile data or error handling
 */
import { getProfile } from "@/server/actions/profiles";
import { auth } from "@clerk/nextjs/server";
import ProfileForm from "@/components/forms/ProfileForm";

/**
 * Edit profile page component that handles profile editing experience.
 *
 * Data Flow:
 * 1. Authenticate user with Clerk
 * 2. Fetch user's existing profile from database
 * 3. Pass profile data to ProfileForm for editing
 * 4. Handle form submission and profile updates
 *
 * Error Handling:
 * - Throws error if user is not authenticated
 * - Handles missing profile data gracefully
 * - Provides fallback for data fetching issues
 *
 * Integration:
 * - Uses ProfileForm component with existing profile data
 * - Pre-populates all form fields with current values
 * - Handles form submission and validation internally
 *
 * @returns ProfileForm component with profile data or error handling
 */
export default async function EditProfilePage() {
  // ===== AUTHENTICATION CHECK =====
  const { userId } = await auth();
  if (!userId) throw new Error();

  // ===== PROFILE DATA FETCHING =====
  const profile = await getProfile(userId);

  // ===== RENDER =====
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ProfileForm profile={profile} />
    </div>
  );
}
