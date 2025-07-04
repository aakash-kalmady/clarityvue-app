"use client";

import { createImage, createImageUrl } from "@/server/actions/images";
import { useParams } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import { toast } from "sonner";
import { UploadCloud, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

// shadcn/ui components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the status types for clear feedback
type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function CreateImageForm(props: { albumId: string }) {
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
  const { albumId } = useParams();

  // State to manage the upload process and UI feedback
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState(
    "Drag & drop an image or click to upload"
  );

  // A ref to a timer to reset the component's state after an upload
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  // A ref for the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- File Processing and Upload Logic ---
  const processAndUploadFile = async (file: File) => {
    // 1. Validate the file
    if (file.size > MAX_IMAGE_SIZE) {
      handleUploadError("File is larger than 5MB.");
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
    toast.info(`Starting upload for ${file.name}`);

    try {
      // 3. Get a pre-signed URL
      const { uploadUrl, publicUrl } = await createImageUrl(
        file.name,
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
      handleUploadSuccess(`${file.name} uploaded successfully!`);
    } catch (err: any) {
      handleUploadError(err.message || "An unknown error occurred.");
    }
  };

  // --- UI Feedback Handlers ---
  const handleUploadSuccess = (successMessage: string) => {
    setStatus("success");
    setMessage(successMessage);
    toast.success(successMessage);
    resetTimerRef.current = setTimeout(() => resetComponent(), 3000);
  };

  const handleUploadError = (errorMessage: string) => {
    setStatus("error");
    setMessage(errorMessage);
    toast.error("Upload Failed", { description: errorMessage });
    resetTimerRef.current = setTimeout(() => resetComponent(), 5000);
  };

  const resetComponent = () => {
    setStatus("idle");
    setMessage("Drag & drop an image or click to upload");
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
        return <Loader2 className="h-10 w-10 animate-spin text-primary" />;
      case "success":
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-10 w-10 text-destructive" />;
      default:
        return <UploadCloud className="h-10 w-10 text-gray-400" />;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out
          ${status === "idle" ? "cursor-pointer" : "cursor-default"}
          ${isDragging ? "border-primary bg-primary/10" : "border-gray-300"}
          ${status === "success" && "border-green-500 bg-green-50"}
          ${status === "error" && "border-destructive bg-destructive/10"}`}
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
      <div className="flex flex-row items-center justify-center">
        <StatusIcon />
        <p
          className={`text-sm font-medium ml-2
              ${
                status === "error"
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
