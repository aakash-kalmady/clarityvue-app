import { getImages } from "@/server/actions/images";
import Link from "next/link";
import Image from "next/image";

export default async function PublicAlbumPage({
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
      <div className="flex flex-row">
        <div>
          <h1 className="text-white text-3xl font-semibold">{album.title}</h1>
          <p className="text-neutral-200">Description: {album.description}</p>
        </div>
      </div>

      {images.length < 1 ? (
        <p className="text-white">
          Album has no images, let the owner know to upload one now!
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-5">
          {images.map((image) => (
            <Link href={image.imageUrl} target="_blank" key={image.id}>
              <Image
                key={image.id}
                src={image.imageUrl}
                alt={image.altText}
                width={300}
                height={300}
                quality={100}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
