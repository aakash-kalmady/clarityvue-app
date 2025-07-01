import { z } from "zod";

export const ImageFormSchema = z.object({
  imageUrl: z.string(),
  altText: z.string(),
  caption: z.string(),
  albumId: z.string(),
  imageOrder: z.number(),
});
