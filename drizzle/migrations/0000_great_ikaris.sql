CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(60) NOT NULL,
	"description" text,
	"profile_id" uuid NOT NULL,
	"album_order" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"grid_size" integer,
	"title_color" varchar(7),
	"description_color" varchar(7),
	"title_font_size" integer,
	"single_row" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" varchar(2000) NOT NULL,
	"alt_text" varchar(30),
	"caption" varchar(150),
	"location" varchar(60),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"album_id" uuid NOT NULL,
	"image_order" integer
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"username" varchar(20) NOT NULL,
	"bio" text,
	"background_color" varchar(7),
	"background_image_url" varchar(2000),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "profiles_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "album_order_idx" ON "albums" USING btree ("profile_id","album_order");