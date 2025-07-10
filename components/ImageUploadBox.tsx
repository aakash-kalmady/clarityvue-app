"use client";

import { createImage, createImageUrl } from "@/server/actions/images";
import { useParams } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import { toast } from "sonner";
import { UploadCloud, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

// Define the status types for clear feedback
type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function ImageUploadBox(props: { albumId: string }) {
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
  const { albumId } = useParams();

  // State to manage the upload process and UI feedback
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState("Click or drag to upload animage");

  // A ref to a timer to reset the component's state after an upload
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  // A ref for the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- File Processing and Upload Logic ---
  const processAndUploadFile = async (file: File) => {
    // 1. Validate the file
    if (file.size > MAX_IMAGE_SIZE) {
      handleUploadError("File is larger than 10MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      handleUploadError("Invalid file type. Please upload an image.");
      return;
    }

    // Clear any previous reset timers
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    // 2. Start the upload process
    setStatus("uploading");
    setMessage(`Uploading ${file.name}...`);

    try {
      const fileName = file.name.replaceAll(" ", "_");
      // 3. Get a pre-signed URL
      const { uploadUrl, publicUrl } = await createImageUrl(
        fileName,
        file.type,
        props.albumId
      );

      // 4. Upload the file to the storage provider
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage.");
      }

      // 5. Auto-generate metadata and save to the database
      const altText = file.name.split(".").slice(0, -1).join("."); // Filename without extension
      const caption = `Photo uploaded on ${new Date().toLocaleDateString()}`; // Placeholder caption
      const imageOrder = Math.floor(Math.random() * 1000) + 1; // Random order

      await createImage(albumId as string, {
        imageUrl: publicUrl,
        altText,
        caption,
        imageOrder,
      });

      // 6. Handle success
      handleUploadSuccess(`Image uploaded successfully!`);
    } catch (error: unknown) {
      handleUploadError(error instanceof Error ? error.message : String(error));
    }
  };

  // --- UI Feedback Handlers ---
  const handleUploadSuccess = (successMessage: string) => {
    setStatus("success");
    setMessage(successMessage);
    toast.success(successMessage);
    resetTimerRef.current = setTimeout(() => resetComponent(), 1000);
  };

  const handleUploadError = (errorMessage: string) => {
    setStatus("error");
    setMessage(errorMessage);
    toast.error("Upload Failed", { description: errorMessage });
    resetTimerRef.current = setTimeout(() => resetComponent(), 2000);
  };

  const resetComponent = () => {
    setStatus("idle");
    setMessage("Click or drag to upload");
    // Also reset the file input's value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Event Handlers ---
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== "uploading") setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Necessary to allow the drop event
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (status === "uploading") return;

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processAndUploadFile(droppedFile);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (status === "uploading") return;
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  // --- Render correct icon based on status ---
  const StatusIcon = () => {
    switch (status) {
      case "uploading":
        return (
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-blue-400" />
        );
      case "success":
        return <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />;
      case "error":
        return <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />;
      default:
        return <UploadCloud className="h-6 w-6 sm:h-8 sm:w-8 text-white/60" />;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-6 sm:p-8 w-full border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out
          ${
            status === "idle"
              ? "cursor-pointer hover:scale-[1.02]"
              : "cursor-default"
          }
          ${
            isDragging
              ? "border-blue-400 bg-blue-500/10 scale-[1.02]"
              : "border-white/20 bg-white/5"
          }
          ${status === "success" && "border-green-400 bg-green-500/10"}
          ${status === "error" && "border-red-400 bg-red-500/10"}
          ${status === "uploading" && "border-blue-400 bg-blue-500/10"}
          backdrop-blur-xl`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => status !== "uploading" && fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center">
          <StatusIcon />
        </div>

        <div className="text-center space-y-2">
          <p
            className={`text-base sm:text-lg font-medium
              ${status === "error" ? "text-red-400" : "text-white"}
          `}
          >
            {message}
          </p>

          {status === "idle" && (
            <p className="text-xs sm:text-sm text-white/60">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
