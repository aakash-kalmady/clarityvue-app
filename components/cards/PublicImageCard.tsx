import Image from "next/image";
import Link from "next/link";

/**
 * PublicImageCard Component
 *
 * A simple card component that displays a single image in public album and profile views.
 * This component is used when displaying images to public visitors and provides
 * a clean, minimal interface for viewing images in full size.
 *
 * Features:
 * - Simple, clean design for public viewing
 * - Full-size image viewing in new tab
 * - Proper image optimization with Next.js Image component
 * - Responsive sizing with appropriate breakpoints
 * - Hover effects for better user interaction
 * - Lazy loading for performance optimization
 *
 * Props:
 * @param {Object} image - Image data object
 * @param {string} image.id - Unique image identifier
 * @param {string} image.imageUrl - Image URL for display
 * @param {string} image.altText - Alt text for accessibility
 *
 * Design Considerations:
 * - Minimal interface suitable for public viewing
 * - No edit/delete actions (public users can't modify content)
 * - Focus on image display and viewing experience
 * - Consistent with public album/profile aesthetic
 *
 * Usage Examples:
 *
 * <PublicImageCard
 *   image={{
 *     id: "img-123",
 *     imageUrl: "https://example.com/photo.jpg",
 *     altText: "Sunset over mountains"
 *   }}
 * />
 *
 * @returns {JSX.Element} A simple card component displaying an image for public viewing
 */
export default function PublicImageCard({
  image,
}: {
  image: {
    id: string;
    imageUrl: string;
    altText: string;
  };
}) {
  return (
    <div className="relative group aspect-square overflow-hidden cursor-pointer">
      <Link
        href={image.imageUrl}
        target="_blank"
        className="block w-full h-full"
      >
        <Image
          src={image.imageUrl}
          alt={image.altText}
          width={200}
          height={200}
          className="object-cover"
          quality={75}
          loading="lazy"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </Link>
    </div>
  );
}
