import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const PublicImageCard = memo(function PublicImageCard({
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
});

export default PublicImageCard;
