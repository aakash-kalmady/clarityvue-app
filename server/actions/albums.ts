"use server";

import { db } from "@/drizzle/db";
import { AlbumTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { AlbumFormSchema } from "../schema/albums";
import z from "zod";
import { revalidatePath } from "next/cache";

// Infer the type of a row from the ProfileTable schema
type AlbumRow = typeof AlbumTable.$inferSelect;

export default async function getAlbums(): Promise<AlbumRow[]> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error();
  }
  const event = await db.query.AlbumTable.findMany({
    where: eq(AlbumTable.clerkUserId, userId),
  });

  return event;
}

export async function createAlbum(
  unsafeData: z.infer<typeof AlbumFormSchema>
): Promise<void> {
  try {
    const { userId } = await auth();
    const { success, data } = AlbumFormSchema.safeParse(unsafeData);
    if (!userId || !success) {
      throw new Error("user not authenticated or invalid profile data");
    }
    await db.insert(AlbumTable).values({ ...data, clerkUserId: userId });
  } catch (error: any) {
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    revalidatePath("/dashboard");
  }
}
