"use client";

import { useState, useTransition } from "react";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/server/actions/images";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";

/**
 * PrivateImageCard Component
 *
 * A card component that displays a single image in private album views with edit/delete actions.
 * This component is used when users are viewing their own albums and provides functionality
 * to view images in full size and delete them with confirmation.
 *
 * Features:
 * - Hover-based action button display
 * - Image deletion with confirmation dialog
 * - Full-size image viewing in new tab
 * - Responsive design with galaxy theme styling
 * - Smooth animations and transitions
 * - Error handling with toast notifications
 * - Loading states for delete operations
 * - Proper image optimization with Next.js Image component
 *
 * Props:
 * @param {Object} image - Image data object
 * @param {string} image.id - Unique image identifier
 * @param {string} image.imageUrl - Image URL for display
 * @param {string} image.altText - Alt text for accessibility
 * @param {string} albumId - ID of the album containing this image
 *
 * State Management:
 * - isDeletePending: Tracks delete operation loading state
 * - isHovered: Controls action button visibility
 * - isDialogOpen: Manages confirmation dialog state
 *
 * Event Handlers:
 * - handleDelete: Performs image deletion with error handling
 * - handleDeleteClick: Opens confirmation dialog
 * - Mouse enter/leave: Controls hover state
 *
 * Usage Examples:
 *
 * <PrivateImageCard
 *   image={{
 *     id: "img-123",
 *     imageUrl: "https://example.com/photo.jpg",
 *     altText: "Sunset over mountains"
 *   }}
 *   albumId="album-456"
 * />
 *
 * @returns {JSX.Element} A card component displaying an image with edit/delete actions
 */
export default function PrivateImageCard({
  image,
  albumId,
}: {
  image: { id: string; imageUrl: string; altText: string };
  albumId: string;
}) {
  // ===== STATE MANAGEMENT =====
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ===== DELETE HANDLER =====
  /**
   * Handles the image deletion process
   * - Calls the server action to delete the image
   * - Provides user feedback via toast notifications
   * - Handles errors and displays appropriate messages
   * - Closes the confirmation dialog after completion
   */
  const handleDelete = async () => {
    console.log("Delete button clicked for image:", image.id);
    setIsDialogOpen(false);

    startDeleteTransition(async () => {
      try {
        console.log("Starting delete process...");
        console.log("Image URL:", image.imageUrl);
        console.log("Album ID:", albumId);

        // Test if the server action is accessible
        console.log("deleteImage function:", typeof deleteImage);

        await deleteImage(image.imageUrl, albumId, true);
        console.log("Delete successful");
        toast.success("Image deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error(
          `Failed to delete image: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    });
  };

  // ===== DIALOG HANDLER =====
  /**
   * Handles the delete button click event
   * - Prevents default link behavior
   * - Stops event propagation
   * - Opens the confirmation dialog
   */
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete button clicked");
    setIsDialogOpen(true);
  };

  // ===== RENDER =====
  return (
    <div
      className="relative group aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-slate-800/60 via-blue-900/30 to-indigo-900/40 border border-slate-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-full">
        <Image
          src={image.imageUrl}
          alt={image.altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          loading="lazy"
          quality={75}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300" />
      </div>

      {/* Action Buttons Container */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* View Button */}
        <Button
          asChild
          size="icon"
          variant="secondary"
          className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-600/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Link href={image.imageUrl} target="_blank">
            <Eye className="h-4 w-4" />
          </Link>
        </Button>

        {/* Delete Button with Confirmation Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              disabled={isDeletePending}
              className="bg-red-600/90 hover:bg-red-700 text-slate-100 border border-red-500/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          {/* Delete Confirmation Dialog */}
          <AlertDialogContent className="bg-slate-900/95 border border-slate-600/50 backdrop-blur-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-slate-100">
                Delete Image
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-300">
                This action cannot be undone. This will permanently delete this
                image from your album.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 border border-slate-600/50"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-slate-100"
                disabled={isDeletePending}
              >
                {isDeletePending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
