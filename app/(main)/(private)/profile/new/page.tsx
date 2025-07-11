/**
 * New Profile Page: Page for creating a new user profile.
 *
 * This page provides:
 * - Full-screen form for profile creation
 * - Centered layout for optimal user experience
 * - Integration with ProfileForm component
 *
 * Features:
 * - Responsive design with centered content
 * - Full-height layout for form focus
 * - Seamless integration with profile creation flow
 * - Automatic redirect from dashboard if no profile exists
 *
 * User Flow:
 * 1. User is redirected here from dashboard if no profile exists
 * 2. User fills out profile form (display name, username, bio)
 * 3. Form submission creates profile in database
 * 4. User is redirected back to dashboard
 *
 * @returns ProfileForm component in a centered layout
 */
import ProfileForm from "@/components/forms/ProfileForm";

/**
 * New profile page component that renders the profile creation form.
 *
 * Layout:
 * - Full-screen container for immersive experience
 * - Centered content for optimal focus
 * - Responsive design for all screen sizes
 * - Clean, distraction-free environment for form completion
 *
 * Integration:
 * - Uses ProfileForm component for form handling
 * - No props passed (creates new profile)
 * - Handles form submission and validation internally
 *
 * @returns ProfileForm component wrapped in centered layout
 */
export default async function NewProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ProfileForm />
    </div>
  );
}
