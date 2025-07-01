"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
): Promise<{ url: string; publicUrl: string }> {
  const uniqueFileName = `${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uniqueFileName,
    ContentType: imgType,
  };

  const command = new PutObjectCommand(params);

  const url = await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minute timeout
  const publicUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

  return { url, publicUrl };
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
