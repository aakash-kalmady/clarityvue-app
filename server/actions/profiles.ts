"use server";

import { db } from "@/drizzle/db";
import { ProfileTable } from "@/drizzle/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ProfileFormSchema } from "../schema/profiles";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import z from "zod";

// Infer the type of a profile from the ProfileTable schema
type Profile = typeof ProfileTable.$inferSelect;

// This function creates a new profile in the database after validating the input data.
export async function createProfile(
  unsafeData: z.infer<typeof ProfileFormSchema> // Raw profile data to validate and create
): Promise<void> {
  try {
    // Authenticate the user
    const user = await currentUser();
    // Validate the incoming data against the profile form schema
    const { success, data } = ProfileFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !user) {
      throw new Error("Invalid profile data or user not authenticated.");
    }

    // Attempt to create the profile in the database
    await db
      .insert(ProfileTable)
      .values({ ...data, imageUrl: user.imageUrl, clerkUserId: user.id });
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}

// This function updates an existing profile in the database after validating the input and checking ownership.
export async function updateProfile(
  unsafeData: z.infer<typeof ProfileFormSchema> // Raw profile data to validate and update
): Promise<void> {
  try {
    // Authenticate the user
    const user = await currentUser();
    // Validate the incoming data against the profile form schema
    const { success, data } = ProfileFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !user) {
      throw new Error("Invalid profile data or user not authenticated.");
    }

    // Attempt to update the profile in the database
    const { rowCount } = await db
      .update(ProfileTable)
      .set({ ...data, imageUrl: user.imageUrl }) // Update with validated data
      .where(eq(ProfileTable.clerkUserId, user.id)); // Ensure user owns the event

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

// This function fetches the profile for a specific user
export async function getProfile(userId: string): Promise<Profile | undefined> {
  // Query the database for the profile where the clerkUserId matches
  const profile = await db.query.ProfileTable.findFirst({
    where: eq(ProfileTable.clerkUserId, userId),
  });

  return profile ?? undefined; // Explicitly return undefined if not found
}

// This function fetches the profile for a specific user given their username
export async function getProfileByUsername(
  username: string
): Promise<Profile | undefined> {
  // Query the database for the profile where the username matches
  const profile = await db.query.ProfileTable.findFirst({
    where: eq(ProfileTable.username, username),
  });

  return profile ?? undefined; // Explicitly return undefined if not found
}

// This function deletes an existing profile from the database
export async function deleteProfile(userId: string): Promise<void> {
  try {
    // Attempt to delete the profile
    const { rowCount } = await db
      .delete(ProfileTable)
      .where(eq(ProfileTable.clerkUserId, userId));

    // If no profile was deleted (not found), throw an error
    if (rowCount === 0) {
      throw new Error("Profile not found.");
    }
  } catch (error: any) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(`Failed to delete profile: ${error.message || error}`);
  } finally {
    // Revalidate the '/dashboard' path to ensure the page fetches fresh data after the database operation
    revalidatePath("/dashboard");
  }
}
