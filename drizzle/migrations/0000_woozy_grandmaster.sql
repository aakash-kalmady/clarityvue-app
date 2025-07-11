CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(150) NOT NULL,
	"clerkUserId" text NOT NULL,
	"albumOrder" integer NOT NULL,
	"imageUrl" varchar(2000) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"imageUrl" varchar(2000) NOT NULL,
	"altText" varchar(50) NOT NULL,
	"caption" varchar(150) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"albumId" uuid NOT NULL,
	"imageOrder" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_albumId_albums_id_fk" FOREIGN KEY ("albumId") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "clerk_user_album_order_idx" ON "albums" USING btree ("clerkUserId","albumOrder");