/**
 * ImageUploadBox: Drag-and-drop image upload component with real-time feedback.
 *
 * This component provides:
 * - Drag and drop file upload functionality
 * - File validation (size, type, format)
 * - Real-time upload progress and status feedback
 * - Automatic metadata generation
 * - Error handling and user notifications
 * - Responsive design for all screen sizes
 *
 * Features:
 * - Visual feedback for drag states
 * - Upload status indicators (idle, uploading, success, error)
 * - File size validation (10MB limit)
 * - Image type validation
 * - Automatic file processing and storage
 * - Toast notifications for user feedback
 * - Auto-reset functionality after upload
 *
 * Upload Process:
 * 1. File validation (size and type)
 * 2. Pre-signed URL generation
 * 3. File upload to storage provider
 * 4. Metadata generation and database save
 * 5. Success/error feedback and reset
 *
 * @param albumId - The ID of the album to upload images to
 *
 * @example
 * <ImageUploadBox albumId="album-123" />
 */
"use client";

import { createImage, createImageUrl } from "@/server/actions/images";
import { useParams } from "next/navigation";
import { useState, useRef, ChangeEvent } from "react";
import { toast } from "sonner";
import { UploadCloud, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

// Define the status types for clear feedback
type UploadStatus = "idle" | "uploading" | "success" | "error";

/**
 * Image upload component with drag-and-drop functionality.
 *
 * State Management:
 * - Upload status tracking (idle, uploading, success, error)
 * - Drag state for visual feedback
 * - Message display for user communication
 * - Timer management for auto-reset functionality
 *
 * @param props - Component props containing albumId
 * @returns ImageUploadBox component with upload functionality
 */
export default function ImageUploadBox(props: { albumId: string }) {
  // Configuration constants
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
  const { albumId } = useParams();

  // State to manage the upload process and UI feedback
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState("Click or drag to upload an image");

  // A ref to a timer to reset the component's state after an upload
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  // A ref for the hidden file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // --- File Processing and Upload Logic ---
  /**
   * Processes and uploads a file with comprehensive validation and feedback.
   *
   * Steps:
   * 1. Validate file size and type
   * 2. Generate pre-signed URL
   * 3. Upload file to storage
   * 4. Generate metadata and save to database
   * 5. Handle success/error feedback
   *
   * @param file - The file to upload
   */
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
  /**
   * Handles successful upload with user feedback and auto-reset.
   *
   * @param successMessage - Message to display to user
   */
  const handleUploadSuccess = (successMessage: string) => {
    setStatus("success");
    setMessage(successMessage);
    toast.success(successMessage);
    resetTimerRef.current = setTimeout(() => resetComponent(), 1000);
  };

  /**
   * Handles upload errors with user feedback and auto-reset.
   *
   * @param errorMessage - Error message to display to user
   */
  const handleUploadError = (errorMessage: string) => {
    setStatus("error");
    setMessage(errorMessage);
    toast.error("Upload Failed", { description: errorMessage });
    resetTimerRef.current = setTimeout(() => resetComponent(), 2000);
  };

  /**
   * Resets the component state to idle and clears file input.
   */
  const resetComponent = () => {
    setStatus("idle");
    setMessage("Click or drag to upload");
    // Also reset the file input's value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --- Event Handlers ---
  /**
   * Handles drag enter events for visual feedback.
   *
   * @param e - Drag event
   */
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== "uploading") setIsDragging(true);
  };

  /**
   * Handles drag leave events to reset visual state.
   *
   * @param e - Drag event
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handles drag over events to allow drop functionality.
   *
   * @param e - Drag event
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Necessary to allow the drop event
  };

  /**
   * Handles file drop events and initiates upload.
   *
   * @param e - Drop event
   */
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

  /**
   * Handles file selection from input element.
   *
   * @param e - Change event from file input
   */
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (status === "uploading") return;
    const file = e.target.files?.[0];
    if (file) {
      processAndUploadFile(file);
    }
  };

  // --- Render correct icon based on status ---
  /**
   * Renders the appropriate icon based on current upload status.
   *
   * @returns Status-specific icon component
   */
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
        return <UploadCloud className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />;
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
              ? "border-blue-400 bg-blue-600/10 scale-[1.02]"
              : "border-slate-600/50 bg-slate-800/30"
          }
          ${status === "success" && "border-green-400 bg-green-600/10"}
          ${status === "error" && "border-red-400 bg-red-600/10"}
          ${status === "uploading" && "border-blue-400 bg-blue-600/10"}
          backdrop-blur-xl`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => status !== "uploading" && fileInputRef.current?.click()}
    >
      {/* Hidden file input for click-to-upload functionality */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />

      {/* Upload interface with status-based content */}
      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4">
        {/* Status icon */}
        <div className="flex items-center justify-center">
          <StatusIcon />
        </div>

        {/* Status message and instructions */}
        <div className="text-center space-y-2">
          <p
            className={`text-base sm:text-lg font-medium ${
              status === "idle"
                ? "text-slate-200"
                : status === "success"
                ? "text-green-300"
                : status === "error"
                ? "text-red-300"
                : "text-blue-300"
            }`}
          >
            {message}
          </p>
          {status === "idle" && (
            <p className="text-slate-400 text-sm">
              Supports JPG, PNG, GIF up to 10MB
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
