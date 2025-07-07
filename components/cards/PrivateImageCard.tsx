"use client"; // This component needs to be a client component for interactivity

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog"; // Adjust path as per your setup
import { Button } from "@/components/ui/button"; // Adjust path as per your setup
import { deleteImage } from "@/server/actions/images";
import { toast } from "sonner";

interface ImageCardProps {
  image: {
    id: string;
    imageUrl: string;
    altText: string;
  };
  albumId: string;
}

export default function PrivateImageCard({ image, albumId }: ImageCardProps) {
  const [isDeletePending, startDeleteTransition] = useTransition();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group aspect-square overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={image.imageUrl} target="_blank" className=" w-full h-full">
        <Image
          src={image.imageUrl}
          alt={image.altText}
          width={200}
          height={200}
          objectFit="cover" // Cover the container while maintaining aspect ratio
          quality={50}
        />
      </Link>

      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="shadow-lg cursor-pointer"
                disabled={isDeletePending}
              >
                <Trash2 className="h-6 w-6" />
                <span className="sr-only">Delete Image</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this image.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-700 text-white cursor-pointer"
                  onClick={() => {
                    startDeleteTransition(async () => {
                      await deleteImage(image.imageUrl, albumId, true);
                      toast.success("Image deleted successfully!");
                    });
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
