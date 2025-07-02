"use client";

import { createImage, createImageUrl } from "@/server/actions/images";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";

type CreateImageFormProps = {
  albumId: string;
};

export default function CreateImageForm(props: CreateImageFormProps) {
  // Define the maximum file size (10MB in bytes)
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
  // State to hold the selected file
  const [file, setFile] = useState<File | null>(null);
  // State to manage loading status
  const [uploading, setUploading] = useState(false);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);
  // State to store the URL of the uploaded image
  const [imageUrl, setImageUrl] = useState("");

  const [altText, setAltText] = useState("");

  const [caption, setCaption] = useState("");

  const [imageOrder, setImageOrder] = useState(0);

  const { albumId } = useParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].size < MAX_IMAGE_SIZE) {
      setFile(e.target.files[0]);
      // Reset error and image URL when a new file is selected
      setError(null);
    } else {
      setFile(null);
      setError("File is larger than 5MB");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setUploading(true);
    setError(null);

    try {
      const { uploadUrl, publicUrl } = await createImageUrl(
        file.name,
        file.type,
        albumId as string
      );
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file, // The actual file object goes here
        headers: {
          "Content-Type": file.type, // The file's content type is required
        },
      });
      if (!response.ok) {
        throw new Error("Upload failed.");
      }
      setImageUrl(publicUrl);
      setUploading(false);
      const data = {
        imageUrl: publicUrl,
        altText,
        caption,
        imageOrder,
      };
      await createImage(albumId as string, data);
    } catch (error: any) {
      setUploading(false);
      throw new Error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Upload an Image to Album
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="file"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Choose an image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*" // Accept only image files
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <input
          type="text"
          placeholder="Alt Text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="number"
          min="1"
          placeholder="Image Order"
          value={imageOrder}
          onChange={(e) => setImageOrder(parseInt(e.target.value))}
        />
        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full px-4 py-2 text-white font-bold bg-blue-600 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Display error messages */}
      {error && (
        <p className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">
          {error}
        </p>
      )}

      {/* Display success message and the uploaded image */}
      {imageUrl && (
        <div className="mt-6 text-center">
          <p className="text-green-600 bg-green-100 p-3 rounded-md">
            Upload successful!
          </p>
          <div className="mt-4">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {imageUrl}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
