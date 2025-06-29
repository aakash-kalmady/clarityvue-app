CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"profileId" uuid NOT NULL,
	"albumOrder" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"gridSize" integer,
	"titleColor" text,
	"descriptionColor" text,
	"titleFontSize" integer,
	"singleRow" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"imageUrl" text NOT NULL,
	"altText" text,
	"caption" text,
	"location" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"albumId" uuid NOT NULL,
	"imageOrder" integer
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" text NOT NULL,
	"username" text NOT NULL,
	"bio" text DEFAULT 'Welcome to my profile!' NOT NULL,
	"backgroundColor" text DEFAULT 'FFFFFF' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_profileId_profiles_id_fk" FOREIGN KEY ("profileId") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_albumId_albums_id_fk" FOREIGN KEY ("albumId") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "albums_profileId_albumOrder_index" ON "albums" USING btree ("profileId","albumOrder");