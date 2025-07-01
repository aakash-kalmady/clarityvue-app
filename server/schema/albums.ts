import { z } from "zod";

export const AlbumFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  albumOrder: z.number(),
});
