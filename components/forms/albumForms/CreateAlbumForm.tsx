"use client";

import { createAlbum } from "@/server/actions/albums";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAlbumForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumOrder, setAlbumOrder] = useState(0);
  const [gridSize, setGridSize] = useState(0);
  const [singleRow, setSingleRow] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    const data = {
      title,
      description,
      albumOrder,
      gridSize,
      singleRow,
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
      <input
        type="text"
        placeholder="gridSize"
        value={gridSize}
        onChange={(e) => setGridSize(parseInt(e.target.value))}
      />
      <input
        type="text"
        placeholder="singleRow"
        value={singleRow.toString()}
        onChange={(e) => setSingleRow(Boolean(e.target.value))}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
