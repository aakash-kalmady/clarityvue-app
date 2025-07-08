import { z } from "zod";

export const AlbumFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50, { message: "Title cannot be more than 50 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." })
    .max(150, { message: "Description cannot be more than 150 characters." }),
  imageUrl: z.string().min(2).max(2000),
  albumOrder: z.coerce
    .number()
    .int()
    .positive("Duration must be greater than 0"),
});
