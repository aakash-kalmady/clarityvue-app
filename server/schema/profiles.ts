import { z } from "zod";

export const ProfileFormSchema = z.object({
  displayName: z
    .string()
    .min(2, { message: "Display name must be at least 2 characters." })
    .max(50, { message: "Display name cannot be more than 50 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(50, { message: "Username cannot be more than 50 characters." })
    .regex(/^[a-z0-9]+$/, {
      message: "No spaces, uppercase, or special characters allowed.",
    }),
  bio: z
    .string()
    .min(2, { message: "Bio must be at least 2 characters." })
    .max(150, { message: "Bio cannot be more than 150 characters." }),
});
