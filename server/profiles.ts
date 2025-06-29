"use server";

import { db } from "@/drizzle/db";
import { ProfileTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { newProfileFormSchema } from "./schema/profiles";
import z from "zod";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function createProfile(
  unsafeData: z.infer<typeof newProfileFormSchema>
): Promise<void> {
  try {
    const { userId } = await auth();
    const { success, data } = newProfileFormSchema.safeParse(unsafeData);
    if (!userId || !success) {
      throw new Error("user not authenticated or invalid profile data");
    }
    await db.insert(ProfileTable).values({ ...data, clerkUserId: userId });
  } catch (error: any) {
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function updateProfile(
  unsafeData: z.infer<typeof newProfileFormSchema> // Raw event data to validate and update
): Promise<void> {
  try {
    // Authenticate the user
    const { userId } = await auth();

    // Validate the incoming data against the event form schema
    const { success, data } = newProfileFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !userId) {
      throw new Error("Invalid event data or user not authenticated.");
    }

    // Attempt to update the event in the database
    const { rowCount } = await db
      .update(ProfileTable)
      .set({ ...data }) // Update with validated data
      .where(eq(ProfileTable.clerkUserId, userId)); // Ensure user owns the event

    // If no event was updated (either not found or not owned by the user), throw an error
    if (rowCount === 0) {
      throw new Error(
        "Event not found or user not authorized to update this event."
      );
    }
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Failed to update event: ${error.message || error}`);
  } finally {
    // Revalidate the '/events' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/events");
  }
}

// Infer the type of a row from the ProfileTable schema
type ProfileRow = typeof ProfileTable.$inferSelect;

export async function getProfile(): Promise<ProfileRow | undefined> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error();
  }
  const event = await db.query.ProfileTable.findFirst({
    where: eq(ProfileTable.clerkUserId, userId),
  });

  return event;
}
