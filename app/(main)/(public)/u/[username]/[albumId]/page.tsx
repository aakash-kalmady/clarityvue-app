import { getAlbum } from "@/server/actions/albums";
import { getImages } from "@/server/actions/images";
import { redirect } from "next/navigation";
import PublicAlbumPage from "@/components/PublicAlbumPage";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string; albumId: string }>;
}) {
  const { albumId } = await params;
  const album = await getAlbum(albumId);
  if (!album) {
    redirect("/login");
  }

  const images = await getImages(albumId);
  return <PublicAlbumPage album={album} images={images} />;
}
