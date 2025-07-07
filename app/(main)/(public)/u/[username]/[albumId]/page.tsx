import { getAlbum } from "@/server/actions/albums";
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
  return <PublicAlbumPage album={album} />;
}
