import { Button } from "../ui/button";
import { SquarePen, Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";

/**
 * AlbumCard Component
 *
 * A card component that displays a single album with its metadata and action buttons.
 * This component is used in album grids and lists throughout the ClarityVue app,
 * providing a consistent way to display album information with appropriate actions
 * based on whether the user is viewing their own albums (private) or public albums.
 *
 * Features:
 * - Responsive design with galaxy theme styling
 * - Conditional edit button for private albums
 * - Image display with fallback for default images
 * - Hover effects and animations
 * - Tooltip-enhanced action buttons
 * - Proper image optimization with Next.js Image component
 * - Truncated text handling for long titles/descriptions
 *
 * Props:
 * @param {Object} album - Album data object
 * @param {string} album.title - Album title
 * @param {string} album.description - Album description
 * @param {string} album.id - Unique album identifier
 * @param {string} album.imageUrl - Album cover image URL
 * @param {boolean} isPrivate - Whether this is a private album (user's own)
 * @param {string} username - Username for public album links
 *
 * Layout Structure:
 * - Header: Title, description, and edit button (if private)
 * - Content: Album cover image with hover effects
 * - Footer: View album button
 *
 * Usage Examples:
 *
 * // Private album card
 * <AlbumCard
 *   album={{
 *     title: "Summer Vacation",
 *     description: "Photos from our beach trip",
 *     id: "album-123",
 *     imageUrl: "https://example.com/cover.jpg"
 *   }}
 *   isPrivate={true}
 *   username="johndoe"
 * />
 *
 * // Public album card
 * <AlbumCard
 *   album={{
 *     title: "Nature Photography",
 *     description: "Landscape and wildlife shots",
 *     id: "album-456",
 *     imageUrl: "https://example.com/nature.jpg"
 *   }}
 *   isPrivate={false}
 *   username="janedoe"
 * />
 *
 * @returns {JSX.Element} A card component displaying album information and actions
 */
export default function AlbumCard({
  album,
  isPrivate,
  username,
}: {
  album: {
    title: string;
    description: string;
    id: string;
    imageUrl: string;
  };
  isPrivate: boolean;
  username: string;
}) {
  // ===== DATA EXTRACTION =====
  const { title, description, id, imageUrl } = album;

  // ===== IMAGE VALIDATION =====
  /**
   * Determines if the album uses a default placeholder image
   * Used to show appropriate fallback content
   */
  const isDefaultImage =
    !imageUrl || imageUrl.includes("default-ui-image-placeholder");

  // ===== RENDER =====
  return (
    <Card className="group bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 border border-slate-600/50 backdrop-blur-2xl shadow-xl hover:shadow-blue-500/20 hover:border-slate-500/70">
      {/* Card Header - Title, Description, and Edit Button */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          {/* Album Information */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-slate-100 text-base sm:text-lg font-semibold truncate">
              {title}
            </CardTitle>

            <CardDescription className="text-slate-300 text-sm mt-1 line-clamp-2">
              {description}
            </CardDescription>
          </div>

          {/* Edit Button - Only for Private Albums */}
          {isPrivate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="flex-shrink-0 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 shadow-lg p-2 border border-slate-600/50 backdrop-blur-xl transition-all duration-200 hover:scale-110"
                  style={{ boxShadow: "0 2px 12px 0 rgba(59,130,246,0.20)" }}
                >
                  <Link href={`/album/edit/${id}?redirect=/dashboard`}>
                    <SquarePen className="w-4 h-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Album</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardHeader>

      {/* Card Content - Album Cover Image */}
      <CardContent className="pb-4">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 -mx-6 -mt-6">
          {/* Default Image Placeholder */}
          {isDefaultImage ? (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-4xl font-bold select-none">
              <span className="opacity-80">📷</span>
            </div>
          ) : (
            /* Album Cover Image */
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              quality={75}
            />
          )}

          {/* Hover Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
      </CardContent>

      {/* Card Footer - Action Button */}
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-slate-100 text-sm shadow-md"
            asChild
          >
            <Link href={isPrivate ? `/album/${id}` : `/u/${username}/${id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Album
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
