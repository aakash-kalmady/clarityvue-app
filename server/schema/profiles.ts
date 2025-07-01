import { z } from "zod";

export const newProfileFormSchema = z.object({
  displayName: z.string().min(2).max(50),
  username: z.string().trim().toLowerCase().min(2).max(50),
  bio: z.string().optional(),
});
