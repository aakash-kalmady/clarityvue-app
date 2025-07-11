"use server";

import { db } from "@/drizzle/db";
import { ImageTable, AlbumTable } from "@/drizzle/schema";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { and, asc, eq, sql } from "drizzle-orm";
import { ImageFormSchema } from "../schema/images";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import z from "zod";

// Infer the type of an image from the ImageTable schema
type Image = typeof ImageTable.$inferSelect;

// AWS S3 client configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

// This function retireves the PUT request url from AWS S3 for the client to send the image to
export async function createImageUrl(
  fileName: string,
  imgType: string,
  albumId: string
): Promise<{ uploadUrl: string; publicUrl: string }> {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Create a unique image name using the parent albumId and the current time
  const uniqueImageName = `${albumId}-${Date.now()}-${fileName}`;

  // Define the parameters for the AWS S3 PutObjectCommand
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uniqueImageName,
    ContentType: imgType,
  };
  const command = new PutObjectCommand(params);

  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // 60 second timeout
  const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueImageName}`;

  return { uploadUrl, publicUrl };
}

// deletes an image from the s3 database
export async function deleteImage(
  imageUrl: string,
  albumId: string,
  deleteFromTables: boolean
): Promise<void> {
  try {
    // Authenticate the user
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Create a URL object to easily parse it
    const url = new URL(imageUrl);
    // Remove the leading '/' to get the image name
    const key = url.pathname.substring(1);

    // Define the parameters for the AWS S3 DeleteObjectCommand
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };
    const command = new DeleteObjectCommand(params);

    // Attempt to delete the image from the AWS S3 Bucket
    await s3Client.send(command);
    if (deleteFromTables) {
      // Attempt to delete the image from the databse only if it belongs to the authenticated user
      const { rowCount } = await db
        .delete(ImageTable)
        .where(
          and(
            eq(ImageTable.imageUrl, imageUrl),
            eq(ImageTable.albumId, albumId)
          )
        );

      // If no image was deleted (either not found or not owned by current album), throw an error
      if (rowCount === 0) {
        throw new Error(
          "Image not found or album not authorized to delete this image."
        );
      }
    }
  } catch (error: unknown) {
    // If any error occurs, throw a new error with a readable message
    throw new Error(
      `Failed to delete image: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  } finally {
    // Revalidate the `/album/${albumId}` path to ensure the page fetches fresh data after the database operation
    revalidatePath(`/album/${albumId}`);
  }
}

// This function fetches all albums for a specific album
export async function getImages(albumId: string): Promise<Image[]> {
  // Query the database for images where the albumId matches
  const event = await db.query.ImageTable.findMany({
    where: eq(ImageTable.albumId, albumId),
    orderBy: [asc(ImageTable.imageOrder)],
  });

  return event;
}

// This function gets the total image count for a user across all their albums
export async function getUserImageCount(clerkUserId: string): Promise<number> {
  try {
    // Query to count all images that belong to albums owned by the user
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(ImageTable)
      .innerJoin(AlbumTable, eq(ImageTable.albumId, AlbumTable.id))
      .where(eq(AlbumTable.clerkUserId, clerkUserId));

    return result[0]?.count || 0;
  } catch (error: unknown) {
    console.error("Error getting user image count:", error);
    return 0;
  }
}

// This function creates a new image in the database after validating the input data
export async function createImage(
  albumId: string,
  unsafeData: z.infer<typeof ImageFormSchema>
): Promise<void> {
  try {
    // Authenticate the user using Clerk
    const { userId } = await auth();
    // Validate the incoming data against the event form schema
    const { success, data } = ImageFormSchema.safeParse(unsafeData);

    // If validation fails or the user is not authenticated, throw an error
    if (!success || !userId) {
      throw new Error("Invalid event data or user not authenticated.");
    }

    // Attempt to insert the validated image data into the database, linking it to the parent album
    await db.insert(ImageTable).values({ ...data, albumId: albumId });
  } catch (error: unknown) {
    // If any error occurs during the process, throw a new error with a readable message
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    // Revalidate the `/album/${albumIds}` path to ensure the page fetches fresh data after the database operation
    revalidatePath(`/album/${albumId}`);
  }
}

// Deletes all images from the S3 bucket that are in a folder matching the albumId.
export async function deleteImages(albumId: string): Promise<void> {
  try {
    // Define the list object command with the parameters including the image name prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: `${albumId}-`,
    });

    // Attempt to retrieve the list of all images to delete
    const listedObjects = await s3Client.send(listCommand);

    // Only attempt to delete all images if there are images in the album
    if (listedObjects.Contents) {
      // Map the list of images to their keys for deletion
      const objectsToDelete = listedObjects.Contents.map((obj) => ({
        Key: obj.Key,
      }));

      // Define the delete object command with the parameters
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: { Objects: objectsToDelete },
      });

      // Attempt to delete the images from the AWS S3 bucket
      await s3Client.send(deleteCommand);
    }
  } catch (error: unknown) {
    // If any error occurs during the process, throw a new error with a readable message
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
