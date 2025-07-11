/**
 * New Album Page: Page for creating a new album.
 *
 * This page provides:
 * - Full-screen form for album creation
 * - Centered layout for optimal user experience
 * - Integration with AlbumForm component
 *
 * Features:
 * - Responsive design with centered content
 * - Full-height layout for form focus
 * - Seamless integration with album creation flow
 *
 * @returns AlbumForm component in a centered layout
 */
import AlbumForm from "@/components/forms/AlbumForm";

/**
 * New album page component that renders the album creation form.
 *
 * Layout:
 * - Full-screen container for immersive experience
 * - Centered content for optimal focus
 * - Responsive design for all screen sizes
 *
 * @returns AlbumForm component wrapped in centered layout
 */
export default function NewAlbum() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AlbumForm />
    </div>
  );
}
