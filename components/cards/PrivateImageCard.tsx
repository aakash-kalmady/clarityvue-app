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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PrivateImageCard({
  image,
  albumId,
}: {
  image: {
    id: string;
    imageUrl: string;
    altText: string;
  };
  albumId: string;
}) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Delete button clicked");
    setIsDialogOpen(true);
  };

  return (
    <div
      className="relative group aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative w-full h-full">
        <Image
          src={image.imageUrl}
          alt={image.altText}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
      </div>

      {/* Action Buttons */}
      <div
        className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* View Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              size="icon"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110"
            >
              <Link href={image.imageUrl} target="_blank">
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View full size</p>
          </TooltipContent>
        </Tooltip>

        {/* Delete Button */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  disabled={isDeletePending}
                  className="bg-red-500/90 hover:bg-red-600 text-white border border-red-400/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
                  onClick={handleDeleteClick}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete image</p>
              </TooltipContent>
            </Tooltip>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-900/95 border border-white/20 backdrop-blur-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Delete Image
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/70">
                This action cannot be undone. This will permanently delete this
                image from your album.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
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
