ALTER TABLE "albums" ALTER COLUMN "title" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "description" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "albums" ALTER COLUMN "imageUrl" SET DATA TYPE varchar(2000);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "imageUrl" SET DATA TYPE varchar(2000);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "altText" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "images" ALTER COLUMN "caption" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "displayName" SET DATA TYPE varchar(70);--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "username" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "bio" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "bio" SET DEFAULT 'Welcome to my profile!';--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "imageUrl" SET DATA TYPE varchar(2000);