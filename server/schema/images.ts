import { z } from "zod";

export const ImageFormSchema = z.object({
  imageUrl: z.string().min(2).max(2000),
  altText: z.string().min(2).max(50),
  caption: z.string().min(2).max(150),
  imageOrder: z.number(),
});
