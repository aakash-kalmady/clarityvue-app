"use server";

import { db } from "@/drizzle/db";
import { ProfileTable } from "@/drizzle/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ProfileFormSchema } from "../schema/profiles";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import z from "zod";

export async function createProfile(
  unsafeData: z.infer<typeof ProfileFormSchema>
): Promise<void> {
  try {
    const user = await currentUser();
    const { success, data } = ProfileFormSchema.safeParse(unsafeData);
    if (!user || !success) {
      throw new Error("user not authenticated or invalid profile data");
    }
    await db
      .insert(ProfileTable)
      .values({ ...data, imageUrl: user.imageUrl, clerkUserId: user.id });
  } catch (error: any) {
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function updateProfile(
  unsafeData: z.infer<typeof ProfileFormSchema> // Raw profile data to validate and update
): Promise<void> {
  try {
    // Authenticate the user
    const { userId } = await auth();

    // Validate the incoming data against the event form schema
    const { success, data } = ProfileFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !userId) {
      throw new Error("Invalid profile data or user not authenticated.");
    }

    // Attempt to update the profile in the database
    const { rowCount } = await db
      .update(ProfileTable)
      .set({ ...data }) // Update with validated data
      .where(eq(ProfileTable.clerkUserId, userId)); // Ensure user owns the event

    // If no profile was updated (either not found or not owned by the user), throw an error
    if (rowCount === 0) {
      throw new Error(
        "Profile not found or user not authorized to update this profile."
      );
    }
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Failed to update profile: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}

// Infer the type of a row from the ProfileTable schema
type ProfileRow = typeof ProfileTable.$inferSelect;

export async function getProfile(
  userId: string
): Promise<ProfileRow | undefined> {
  const event = await db.query.ProfileTable.findFirst({
    where: eq(ProfileTable.clerkUserId, userId),
  });

  return event;
}

export async function getProfileByUsername(
  username: string
): Promise<ProfileRow | undefined> {
  const event = await db.query.ProfileTable.findFirst({
    where: eq(ProfileTable.username, username),
  });

  return event;
}
