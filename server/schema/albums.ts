import { z } from "zod";

export const AlbumFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  albumOrder: z.number(),
  gridSize: z.number(),
  singleRow: z.boolean(),
});
