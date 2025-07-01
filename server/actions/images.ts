"use server";

import { db } from "@/drizzle/db";
import { ImageTable } from "@/drizzle/schema";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { asc, eq } from "drizzle-orm";
import { ImageFormSchema } from "../schema/images";
import z from "zod";
import { revalidatePath } from "next/cache";

// Infer the type of a row from the AlbumTable schema
type ImageRow = typeof ImageTable.$inferSelect;

// AWS S3 client configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// retireves the put request url for the client to send the image to
export async function createImageUrl(
  fileName: string,
  imgType: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const uniqueFileName = `${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uniqueFileName,
    ContentType: imgType,
  };

  const command = new PutObjectCommand(params);

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minute timeout
  const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

  return { uploadUrl, publicUrl };
}

// deletes an image from the s3 database
export async function deleteImage(imageUrl: string): Promise<void> {
  // Create a URL object to easily parse it
  const url = new URL(imageUrl);

  // The object key is the pathname, but we must remove the leading '/'
  const key = url.pathname.substring(1);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key, // Use the extracted key (filename)
  };
  const command = new DeleteObjectCommand(params);

  try {
    await s3Client.send(command);
    console.log("image deleted");
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error; // Or handle it as needed
  }
}

export async function getImagesByAlbumId(albumId: string): Promise<ImageRow[]> {
  const event = await db.query.ImageTable.findMany({
    where: eq(ImageTable.albumId, albumId),
    orderBy: [asc(ImageTable.imageOrder)],
  });

  return event;
}

export async function createImage(
  albumIds: string,
  unsafeData: z.infer<typeof ImageFormSchema>
): Promise<void> {
  try {
    const { success, data } = ImageFormSchema.safeParse(unsafeData);
    if (!success) {
      throw new Error("invalid image data");
    }
    await db.insert(ImageTable).values({ ...data, albumId: albumIds });
  } catch (error: any) {
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    revalidatePath(`/dashboard/album/${albumIds}`);
  }
}
