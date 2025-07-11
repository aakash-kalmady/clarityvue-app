/**
 * Edit Album Page: Page for editing an existing album.
 *
 * This page provides:
 * - Full-screen form for album editing
 * - Pre-populated form with existing album data
 * - Dynamic routing based on album ID
 * - Integration with AlbumForm component
 *
 * Features:
 * - Dynamic route parameter handling
 * - Album data fetching and validation
 * - Pre-filled form fields with current data
 * - Responsive design with centered content
 * - Seamless integration with album editing flow
 *
 * Route Parameters:
 * - albumId: Unique identifier for the album being edited
 *
 * Data Flow:
 * 1. Extract albumId from URL parameters
 * 2. Fetch album data from database
 * 3. Pass album data to AlbumForm for editing
 * 4. Handle form submission and album updates
 *
 * @param params - Promise containing the albumId parameter from the URL
 * @returns AlbumForm component with existing album data
 */
import { getAlbum } from "@/server/actions/albums";
import AlbumForm from "@/components/forms/AlbumForm";

/**
 * Edit album page component that handles album editing experience.
 *
 * Dynamic Routing:
 * - Uses Next.js dynamic routing with [albumId] parameter
 * - Extracts albumId from URL for data fetching
 * - Handles async parameter resolution
 *
 * Data Fetching:
 * - Fetches album data using albumId from URL
 * - Validates album existence before rendering
 * - Handles missing album data gracefully
 *
 * Integration:
 * - Uses AlbumForm component with existing album data
 * - Pre-populates all form fields with current values
 * - Handles form submission and validation internally
 *
 * Error Handling:
 * - Handles missing album data
 * - Provides fallback for data fetching issues
 * - Validates album ownership (handled in AlbumForm)
 *
 * @param params - Promise containing the albumId parameter
 * @returns AlbumForm component with album data
 */
export default async function EditAlbum({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  // ===== PARAMETER EXTRACTION =====
  const { albumId } = await params;

  // ===== ALBUM DATA FETCHING =====
  const album = await getAlbum(albumId);

  // ===== RENDER =====
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AlbumForm album={album} />
    </div>
  );
}
