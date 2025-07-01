"use server";

import { db } from "@/drizzle/db";
import { AlbumTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { and, asc, eq } from "drizzle-orm";
import { AlbumFormSchema } from "../schema/albums";
import { revalidatePath } from "next/cache";
import z from "zod";

// Infer the type of a row from the AlbumTable schema
type AlbumRow = typeof AlbumTable.$inferSelect;

export async function getAlbums(): Promise<AlbumRow[]> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error();
  }
  const event = await db.query.AlbumTable.findMany({
    where: eq(AlbumTable.clerkUserId, userId),
    orderBy: [asc(AlbumTable.albumOrder)],
  });

  return event;
}

export async function getAlbumById(albumId: string): Promise<AlbumRow> {
  const event = await db.query.AlbumTable.findFirst({
    where: eq(AlbumTable.id, albumId),
  });
  if (!event) {
    throw new Error("Failed to get album");
  }
  return event;
}

export async function createAlbum(
  unsafeData: z.infer<typeof AlbumFormSchema>
): Promise<void> {
  try {
    const { userId } = await auth();
    const { success, data } = AlbumFormSchema.safeParse(unsafeData);
    if (!userId || !success) {
      throw new Error("user not authenticated or invalid album data");
    }
    await db.insert(AlbumTable).values({ ...data, clerkUserId: userId });
  } catch (error: any) {
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    revalidatePath("/dashboard");
  }
}

// updates an existing event in the database after validating the input and checking ownership.
export async function updateAlbum(
  id: string, // ID of the album to update
  unsafeData: z.infer<typeof AlbumFormSchema> // Raw event data to validate and update
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
      .where(and(eq(AlbumTable.id, id), eq(AlbumTable.clerkUserId, userId))); // Ensure user owns the event

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

// deletes an existing album from the database after checking user ownership.
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
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Failed to delete album: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}
