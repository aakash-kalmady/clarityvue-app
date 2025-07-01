"use client";

import EditAlbumForm from "@/components/forms/albumForms/EditAlbumForm";
import { useParams } from "next/navigation";

export default function EditAlbum() {
  const params = useParams();
  const { albumId } = params;
  console.log(albumId as string);
  return <EditAlbumForm albumId={albumId as string} />;
}
