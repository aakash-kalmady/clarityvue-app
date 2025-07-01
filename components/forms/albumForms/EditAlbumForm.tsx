"use client";

import { updateAlbum } from "@/server/actions/albums";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditAlbumFormProps = {
  albumId: string;
};

export default function EditAlbumForm(props: EditAlbumFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumOrder, setAlbumOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      router.push("/dashboard");
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
        value={albumOrder}
        onChange={(e) => setAlbumOrder(parseInt(e.target.value))}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
