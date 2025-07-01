import CreateImageForm from "@/components/forms/imageForms/CreateImageForm";
import DeleteImageForm from "@/components/forms/imageForms/DeleteImageForm";
import { getAlbumById } from "@/server/actions/albums";
import { getImagesByAlbumId } from "@/server/actions/images";
import Link from "next/link";
import Image from "next/image";

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
      <Link className="bg-black text-white text-center" href={"/dashboard"}>
        Home
      </Link>
      <h1>Album Title: {album.title}</h1>
      <p>Description: {album.description}</p>
      <Link
        className="bg-black text-white text-center"
        href={`/dashboard/album/edit/${album.id}`}
      >
        Edit Album
      </Link>
      {images.length < 1 ? (
        <p>You have no images, upload one now!</p>
      ) : (
        <div className="flex flex-row gap-1">
          {images.map((image) => (
            <Image
              key={image.id}
              src={image.imageUrl}
              alt={image.altText}
              width={100}
              height={100}
            />
          ))}
        </div>
      )}

      <CreateImageForm albumId={album.id} />
      <DeleteImageForm />
    </div>
  );
}
