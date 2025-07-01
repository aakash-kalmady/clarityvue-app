"use client";

import {
  deleteAlbum,
  getAlbumById,
  updateAlbum,
} from "@/server/actions/albums";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type EditAlbumFormProps = {
  albumId: string;
};

export default function EditAlbumForm(props: EditAlbumFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumOrder, setAlbumOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      const album = await getAlbumById(props.albumId);
      if (!album) throw new Error();
      setTitle(album.title);
      setDescription(album.description);
      setAlbumOrder(album.albumOrder);
    };
    handleLoad();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteAlbum(props.albumId);
      router.push("/dashboard");
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      title,
      description,
      albumOrder,
    };
    setLoading(true);
    try {
      await updateAlbum(props.albumId, data);
      setLoading(false);
      router.push(`/dashboard/album/${props.albumId}`);
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="albumOrder"
        value={albumOrder.toString()}
        onChange={(e) => setAlbumOrder(parseInt(e.target.value))}
      />
      <button
        className="bg-black text-white text-center cursor-pointer"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <button
        className="bg-black text-white text-center cursor-pointer"
        onClick={handleDelete}
      >
        Delete Album
      </button>
    </div>
  );
}
