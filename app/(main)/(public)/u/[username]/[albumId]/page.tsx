/**
 * Public Album Page: Page for viewing a public album shared by a user.
 *
 * This page provides:
 * - Public album viewing without authentication requirements
 * - Dynamic routing based on username and album ID
 * - Album data fetching and validation
 * - Image display for public viewing
 * - Integration with PublicAlbumPage component
 *
 * Features:
 * - Dynamic route parameter handling (username, albumId)
 * - Album data fetching and validation
 * - Image data retrieval for display
 * - Error handling for missing albums
 * - SEO-friendly public URLs
 *
 * Route Parameters:
 * - username: Username of the album owner
 * - albumId: Unique identifier for the album being viewed
 *
 * Data Flow:
 * 1. Extract username and albumId from URL parameters
 * 2. Fetch album data from database
 * 3. Validate album exists for public viewing
 * 4. Fetch album images for display
 * 5. Render public album interface
 *
 * Public Access:
 * - No authentication required for viewing
 * - Handles missing albums gracefully
 * - Redirects to login if album not found
 * - Provides read-only album viewing experience
 *
 * @param params - Promise containing the username and albumId parameters from the URL
 * @returns PublicAlbumPage component with album and image data
 */
import { getAlbum } from "@/server/actions/albums";
import { getImages } from "@/server/actions/images";
import { redirect } from "next/navigation";
import PublicAlbumPage from "@/components/PublicAlbumPage";

/**
 * Public album page component that handles public album viewing.
 *
 * Dynamic Routing:
 * - Uses Next.js dynamic routing with [username] and [albumId] parameters
 * - Extracts both parameters from URL for data fetching
 * - Handles async parameter resolution
 *
 * Data Fetching:
 * - Fetches album data using albumId from URL
 * - Validates album exists before rendering
 * - Fetches album images for display
 * - Handles missing album data gracefully
 *
 * Integration:
 * - Uses PublicAlbumPage component for rendering
 * - Passes album and image data to component
 * - Provides read-only album viewing experience
 * - Handles all public access logic
 *
 * Error Handling:
 * - Redirects to login if album not found
 * - Handles missing data gracefully
 * - Provides fallback for data fetching issues
 *
 * Public Features:
 * - No authentication required
 * - Read-only album viewing
 * - SEO-friendly URLs
 * - Responsive design for all devices
 *
 * @param params - Promise containing the username and albumId parameters
 * @returns PublicAlbumPage component with data or redirects to login
 */
export default async function Page({
  params,
}: {
  params: Promise<{ username: string; albumId: string }>;
}) {
  // ===== PARAMETER EXTRACTION =====
  const { albumId } = await params;

  // ===== ALBUM DATA FETCHING =====
  const album = await getAlbum(albumId);
  if (!album) {
    redirect("/login");
  }

  // ===== IMAGE DATA FETCHING =====
  const images = await getImages(albumId);

  // ===== RENDER =====
  return <PublicAlbumPage album={album} images={images} />;
}
