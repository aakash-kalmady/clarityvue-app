"use server";

import { db } from "@/drizzle/db";
import { AlbumTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, asc, eq } from "drizzle-orm";
import { AlbumFormSchema } from "../schema/albums";
import { revalidatePath } from "next/cache";
import { deleteImages } from "./images";
import z from "zod";

// Infer the type of an album from the AlbumTable schema
type Album = typeof AlbumTable.$inferSelect;

// This function fetches all albums for a specific user
export async function getAlbums(userId: string): Promise<Album[]> {
  // Query the database for albums where the clerkUserId matches
  const event = await db.query.AlbumTable.findMany({
    where: eq(AlbumTable.clerkUserId, userId),
    orderBy: [asc(AlbumTable.albumOrder)],
  });

  return event;
}

// This function fetches the albums with the matching albumId
export async function getAlbum(albumId: string): Promise<Album | undefined> {
  // Query the database for the album where the albumId matches
  const event = await db.query.AlbumTable.findFirst({
    where: eq(AlbumTable.id, albumId),
  });

  return event ?? undefined; // Explicitly return undefined if not found
}

// This function creates a new album in the database after validating the input data
export async function createAlbum(
  unsafeData: z.infer<typeof AlbumFormSchema> // Accepts raw album data validated by the zod schema
): Promise<void> {
  try {
    // Authenticate the user using Clerk
    const { userId } = await auth();
    // Validate the incoming data against the event form schema
    const { success, data } = AlbumFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !userId) {
      throw new Error("Invalid event data or user not authenticated.");
    }

    // Attempt to insert the validated album data into the database, linking it to the authenticated user
    await db.insert(AlbumTable).values({ ...data, clerkUserId: userId });
  } catch (error: any) {
    // If any error occurs during the process, throw a new error with a readable message
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}

// This function updates an existing album in the database after validating the input and checking ownership
export async function updateAlbum(
  id: string, // ID of the album to update
  unsafeData: z.infer<typeof AlbumFormSchema> // Raw album data to validate and update
): Promise<void> {
  try {
    // Authenticate the user
    const { userId } = await auth();
    // Validate the incoming data against the event form schema
    const { success, data } = AlbumFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !userId) {
      throw new Error("Invalid album data or user not authenticated.");
    }

    // Attempt to update the album in the database
    const { rowCount } = await db
      .update(AlbumTable)
      .set({ ...data }) // Update with validated data
      .where(and(eq(AlbumTable.id, id), eq(AlbumTable.clerkUserId, userId))); // Ensure user owns the album

    // If no album was updated (either not found or not owned by the user), throw an error
    if (rowCount === 0) {
      throw new Error(
        "Album not found or user not authorized to update this album."
      );
    }
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Failed to update album: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}

// This function deletes an existing album from the database after checking user ownership
export async function deleteAlbum(
  albumId: string // ID of the album to delete
): Promise<void> {
  try {
    // Authenticate the user
    const { userId } = await auth();
    // Throw an error if no authenticated user
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    // Attempt to delete the album only if it belongs to the authenticated user
    const { rowCount } = await db
      .delete(AlbumTable)
      .where(
        and(eq(AlbumTable.id, albumId), eq(AlbumTable.clerkUserId, userId))
      );

    // If no album was deleted (either not found or not owned by user), throw an error
    if (rowCount === 0) {
      throw new Error(
        "Album not found or user not authorized to delete this album."
      );
    }

    // Attempt to delete the images from the AWS S3 bucket
    await deleteImages(albumId);
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Failed to delete album: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}
