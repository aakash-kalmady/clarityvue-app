/**
 * CopyButton: Interactive button for copying URLs to clipboard.
 *
 * This component provides:
 * - One-click URL copying functionality
 * - Visual feedback with tooltips
 * - Success notifications via toast
 * - Responsive design for all screen sizes
 *
 * Features:
 * - Clipboard API integration
 * - Toast notifications for user feedback
 * - Tooltip for additional context
 * - Gradient styling for visual appeal
 * - Hover effects and transitions
 * - Error handling for clipboard operations
 *
 * Usage:
 * - Primarily used for copying public profile URLs
 * - Provides immediate feedback on successful copy
 * - Accessible with proper ARIA labels
 *
 * @param publicUrl - The URL to copy to clipboard
 *
 * @example
 * <CopyButton publicUrl="https://clarityvue.com/u/john" />
 */
"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

/**
 * Copy button component with clipboard functionality and user feedback.
 *
 * Functionality:
 * - Copies provided URL to clipboard
 * - Shows success toast notification
 * - Provides tooltip for additional context
 * - Handles clipboard API errors gracefully
 *
 * @param publicUrl - URL string to copy to clipboard
 * @returns Copy button with clipboard integration
 */
export default function CopyButton({ publicUrl }: { publicUrl: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 text-xs sm:text-sm font-semibold shadow-md"
          type="button"
          onClick={async () => {
            try {
              // Copy URL to clipboard using modern Clipboard API
              await navigator.clipboard.writeText(publicUrl);
              // Show success notification
              toast.success("Public profile link copied!");
            } catch (error) {
              // Handle clipboard errors gracefully
              console.error("Failed to copy URL:", error);
              toast.error("Failed to copy link. Please try again.");
            }
          }}
        >
          Copy public link
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy your public profile URL</p>
      </TooltipContent>
    </Tooltip>
  );
}
