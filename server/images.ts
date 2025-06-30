"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { auth } from "@clerk/nextjs/server";

// Configure the AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function postImage(file: File | null) {
  try {
    if (!file) {
      throw new Error();
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImageToS3(buffer, file.name, file.type);
    const { userId } = await auth();
    //db add image with user id and this url
    return url;
  } catch (error) {
    throw new Error();
  }
}

// This function uploads the file buffer to S3
async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  imgType: string
): Promise<string> {
  const fileBuffer = file;
  const uniqueFileName = `${fileName}-${Date.now()}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uniqueFileName,
    Body: fileBuffer,
    ContentType: imgType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  // Construct the public URL for the uploaded file
  const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
  return url;
}

export async function deleteImageFromS3(fileName: string) {
  const bucketName = process.env.S3_BUCKET_NAME;

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  const command = new DeleteObjectCommand(params);

  try {
    await s3Client.send(command);
    console.log(`Successfully deleted ${fileName} from ${bucketName}`);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error; // Or handle it as needed
  }
}
