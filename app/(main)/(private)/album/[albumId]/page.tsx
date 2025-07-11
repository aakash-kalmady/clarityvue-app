/**
 * Private Album Page: Page for viewing and managing a user's own album.
 *
 * This page provides:
 * - Private album viewing with full management capabilities
 * - Authentication-based access control
 * - Album ownership validation
 * - Image management and display
 * - Integration with PrivateAlbumPage component
 *
 * Features:
 * - Server-side authentication checking
 * - Album data fetching with user information
 * - Ownership validation for security
 * - Image data retrieval for display
 * - Error handling for missing or unauthorized access
 *
 * Authentication & Authorization Flow:
 * 1. Check if user is authenticated using Clerk
 * 2. Fetch album data with user information
 * 3. Validate album exists and user owns it
 * 4. Fetch album images for display
 * 5. Render private album interface with full controls
 *
 * Security Features:
 * - Validates user authentication before access
 * - Ensures user owns the album being accessed
 * - Throws errors for unauthorized access attempts
 * - Handles missing data gracefully
 *
 * @param params - Promise containing the albumId parameter from the URL
 * @returns PrivateAlbumPage component with album and image data
 */
import { getAlbumWithUsername } from "@/server/actions/albums";
import { getImages } from "@/server/actions/images";
import { auth } from "@clerk/nextjs/server";
import PrivateAlbumPage from "@/components/PrivateAlbumPage";

/**
 * Private album page component that handles authenticated album viewing.
 *
 * Data Flow:
 * 1. Extract albumId from URL parameters
 * 2. Authenticate user with Clerk
 * 3. Fetch album data with user information
 * 4. Validate album exists and user ownership
 * 5. Fetch album images for display
 * 6. Render private album interface
 *
 * Security Validation:
 * - Ensures user is authenticated before access
 * - Validates that the authenticated user owns the album
 * - Throws errors for unauthorized access attempts
 * - Handles missing album data gracefully
 *
 * Integration:
 * - Uses PrivateAlbumPage component for rendering
 * - Passes album and image data to component
 * - Handles all authentication and authorization logic
 * - Provides full album management capabilities
 *
 * Error Handling:
 * - Throws error if album not found
 * - Throws error if user not authenticated for album access
 * - Handles missing data gracefully
 *
 * @param params - Promise containing the albumId parameter
 * @returns PrivateAlbumPage component with data or error handling
 */
export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  // ===== PARAMETER EXTRACTION =====
  const { albumId } = await params;

  // ===== ALBUM DATA FETCHING =====
  const album = await getAlbumWithUsername(albumId);
  if (!album) {
    throw new Error("Album not found");
  }

  // ===== AUTHENTICATION & AUTHORIZATION =====
  const { userId } = await auth();
  if (userId !== album.clerkUserId) {
    throw new Error("User not authenticated to access this page");
  }

  // ===== IMAGE DATA FETCHING =====
  const images = await getImages(albumId);

  // ===== RENDER =====
  return <PrivateAlbumPage album={album} images={images} />;
}
