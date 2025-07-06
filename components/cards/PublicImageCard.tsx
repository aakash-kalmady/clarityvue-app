import Image from "next/image";
import Link from "next/link";

interface ImageCardProps {
  image: {
    id: string;
    imageUrl: string;
    altText: string;
  };
}

export default function PrivateImageCard({ image }: ImageCardProps) {
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
          objectFit="cover" // Cover the container while maintaining aspect ratio
          quality={50}
        />
      </Link>
    </div>
  );
}
