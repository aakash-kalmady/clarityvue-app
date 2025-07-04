import { getImages } from "@/server/actions/images";
import Link from "next/link";
import ImageUploadBox from "@/components/ImageUploadBox";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PrivateImageCard from "./cards/PrivateImageCard";

export default async function PrivateAlbumPage({
  album, // Destructure the `event` object from the props
}: {
  // Define the shape (TypeScript type) of the expected props
  album: {
    // Optional `event` object (might be undefined if creating a new event)
    id: string;
    title: string; // Unique identifier for the event
    description: string; // Name of the event
    albumOrder: number; // Optional description of the event
  };
}) {
  const images = await getImages(album.id);
  return (
    <div className="p-5">
      <div className="flex flex-row items-center w-full">
        <div className="mr-5">
          <div className="flex flex-row items-center">
            <h1 className="text-white text-3xl font-semibold">{album.title}</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild>
                  <Link href={`/album/edit/${album.id}`}>
                    <Pencil />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Album</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <p className="text-neutral-200">Description: {album.description}</p>
        </div>

        <ImageUploadBox albumId={album.id} />
      </div>
      {/* <DeleteImageForm albumId={album.id} /> */}
      {images.length < 1 ? (
        <p className="text-white mt-5">You have no images, upload one now!</p>
      ) : (
        <div className="grid grid-cols-5 gap-4 mt-5">
          {images.map((image) => (
            <PrivateImageCard key={image.id} image={image} albumId={album.id} />
          ))}
        </div>
      )}
    </div>
  );
}
