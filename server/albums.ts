import { db } from "@/drizzle/db";
import { AlbumTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { newAlbumFormSchema } from "./schema/albums";
import z from "zod";
import { revalidatePath } from "next/cache";

export async function createAlbum(
  unsafeData: z.infer<typeof newAlbumFormSchema>
): Promise<void> {
  try {
    const { userId } = await auth();
    const { success, data } = newAlbumFormSchema.safeParse(unsafeData);
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
