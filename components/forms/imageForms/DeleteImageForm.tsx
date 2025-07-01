"use client";

import { deleteImage } from "@/server/actions/images";
import React, { useState } from "react";

/**
 * A form component for deleting an image by providing its URL.
 */
export default function DeleteImageForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles the form submission event.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!imageUrl) {
      alert("Please enter an image URL.");
      return;
    }
    setIsSubmitting(true);
    try {
      await deleteImage(imageUrl);
      setIsSubmitting(false);
      setImageUrl("");
    } catch (error: any) {
      setIsSubmitting(false);
      throw new Error(error);
    }
    setIsSubmitting(false);
    setImageUrl(""); // Clear the input field after submission
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 my-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Delete an Image from Album
      </h2>
      <p className="text-center text-gray-600">
        Enter the URL of the image you want to remove.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="imageUrl"
            className="text-sm font-medium text-gray-700 sr-only"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text" // Using type="text" is more robust for various URL formats
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
            className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {isSubmitting ? "Deleting..." : "Delete Image"}
        </button>
      </form>
    </div>
  );
}
