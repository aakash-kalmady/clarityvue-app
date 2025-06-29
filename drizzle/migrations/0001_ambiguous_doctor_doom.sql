ALTER TABLE "profiles" ADD COLUMN "displayName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_clerkUserId_unique" UNIQUE("clerkUserId");