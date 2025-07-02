import { getAlbumById } from "@/server/actions/albums";
import { getImagesByAlbumId } from "@/server/actions/images";
import Link from "next/link";
import Image from "next/image";
import CreateImageForm from "@/components/forms/imageForms/CreateImageForm";
import DeleteImageForm from "@/components/forms/imageForms/DeleteImageForm";
import { Button } from "@/components/ui/button";

export default async function AlbumPage({
  params,
}: {
  params: { albumId: string };
}) {
  const albumId = params.albumId;
  const album = await getAlbumById(albumId);
  const images = await getImagesByAlbumId(albumId);
  return (
    <div>
      <h1>Album Title: {album.title}</h1>
      <p>Description: {album.description}</p>
      <Button>
        <Link href={`/album/edit/${album.id}`}>Edit Album</Link>
      </Button>

      <div className="flex flex-row">
        <CreateImageForm albumId={album.id} />
        <DeleteImageForm />
      </div>

      {images.length < 1 ? (
        <p>You have no images, upload one now!</p>
      ) : (
        <div className="grid grid-cols-5 gap-4 mt-5">
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
