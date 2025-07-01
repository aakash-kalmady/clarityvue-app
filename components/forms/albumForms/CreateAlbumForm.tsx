"use client";

import { createAlbum } from "@/server/actions/albums";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAlbumForm() {
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
      await createAlbum(data);
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
