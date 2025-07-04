"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { db } from "@/drizzle/db";
import { ImageTable } from "@/drizzle/schema";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { and, asc, eq } from "drizzle-orm";
import { ImageFormSchema } from "../schema/images";
import { revalidatePath } from "next/cache";
import z from "zod";
import { auth } from "@clerk/nextjs/server";

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
  imgType: string,
  albumId: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("user not authenticated");
  }
  const uniqueFileName = `${albumId}-${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uniqueFileName,
    ContentType: imgType,
  };

  const command = new PutObjectCommand(params);

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // 1 minute timeout
  const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

  return { uploadUrl, publicUrl };
}

// deletes an image from the s3 database
export async function deleteImage(
  imageUrl: string,
  albumId: string
): Promise<void> {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("user not authenticated");
    }
    // Create a URL object to easily parse it
    const url = new URL(imageUrl);

    // The object key is the pathname, but we must remove the leading '/'
    const key = url.pathname.substring(1);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key, // Use the extracted key (filename)
    };
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    console.log("image deleted");
    // Attempt to delete the image only if it belongs to the authenticated user
    const { rowCount } = await db
      .delete(ImageTable)
      .where(
        and(eq(ImageTable.imageUrl, imageUrl), eq(ImageTable.albumId, albumId))
      );

    // If no album was deleted (either not found or not owned by current album), throw an error
    if (rowCount === 0) {
      throw new Error(
        "Image not found or album not authorized to delete this album."
      );
    }
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error; // Or handle it as needed
  } finally {
    revalidatePath(`/album/${albumId}`);
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
    const { userId } = await auth();
    if (!userId) {
      throw new Error("user not authenticated");
    }
    const { success, data } = ImageFormSchema.safeParse(unsafeData);
    if (!success) {
      throw new Error("invalid image data");
    }
    await db.insert(ImageTable).values({ ...data, albumId: albumIds });
  } catch (error: any) {
    throw new Error(`Error: ${error.message || error}`);
  } finally {
    revalidatePath(`/album/${albumIds}`);
  }
}

// Deletes all images from the S3 bucket that are in a folder matching the albumId.
export async function deleteImagesByAlbumId(
  albumId: string
): Promise<{ success: boolean; message: string }> {
  // The "directory" in S3 is just a prefix. Ensure it ends with a slash.
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("user not authenticated");
    }
    const bucketName = process.env.S3_BUCKET_NAME;
    if (!bucketName) {
      console.error("S3_BUCKET_NAME environment variable is not set.");
      return { success: false, message: "Server configuration error." };
    }
    // 1. List all objects with the given prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: `${albumId}-`,
    });
    const listedObjects = await s3Client.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      return {
        success: true,
        message: "Directory is already empty or does not exist.",
      };
    }

    // 2. Prepare the list of keys for deletion
    const objectsToDelete = listedObjects.Contents.map((obj) => ({
      Key: obj.Key,
    }));

    // 3. Execute the batch delete command
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: { Objects: objectsToDelete },
    });
    await s3Client.send(deleteCommand);

    console.log(
      `Successfully deleted ${objectsToDelete.length} objects for albumId: ${albumId}.`
    );
    return {
      success: true,
      message: `Successfully deleted directory: ${albumId}`,
    };
  } catch (error) {
    console.error(
      `Failed to delete S3 directory for albumId ${albumId}:`,
      error
    );
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return {
      success: false,
      message: "An unknown error occurred during S3 directory deletion.",
    };
  }
}
