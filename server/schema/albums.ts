import { z } from "zod";

export const newAlbumFormSchema = z.object({
  username: z.string().min(2, "Required"),
  bio: z.string().optional(),
  backgroundColor: z.string().optional(),
});
