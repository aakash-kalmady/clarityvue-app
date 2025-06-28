import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Profile Table: Stores user profile information.
export const ProfileTable = pgTable("profiles", {
  // A unique identifier for each profile page, generated automatically.
  id: uuid("id").defaultRandom().primaryKey(),
  // The user ID from your authentication provider (e.g., Clerk).
  clerkUserId: text("clerk_user_id").notNull().unique(),
  // The user's chosen username, must be unique.
  username: varchar("username", { length: 20 }).notNull().unique(),
  // A short biography for the user.
  bio: text("bio"),
  // A hex code for the profile's background color.
  backgroundColor: varchar("background_color", { length: 7 }),
  // URL for a custom background image.
  backgroundImageUrl: varchar("background_image_url", { length: 2000 }),
  // Timestamp for when the profile was last updated. Updates automatically.
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations for the Profile Table.
// A profile can have many albums.
export const ProfileTableRelations = relations(ProfileTable, ({ many }) => ({
  albums: many(AlbumTable),
}));

// Album Table: Stores collections of images.
export const AlbumTable = pgTable(
  "albums",
  {
    // A unique identifier for each album, generated automatically.
    id: uuid("id").defaultRandom().primaryKey(),
    // The title of the album.
    title: varchar("title", { length: 60 }).notNull(),
    // A detailed description of the album.
    description: text("description"),
    // Foreign key linking to the profile this album belongs to.
    profileId: uuid("profile_id")
      .notNull()
      .references(() => ProfileTable.id, { onDelete: "cascade" }),
    // The display order of this album on the profile page.
    albumOrder: integer("album_order"),
    // Timestamp for when the album was created.
    createdAt: timestamp("created_at").defaultNow().notNull(),
    // Timestamp for when the album was last updated. Updates automatically.
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    // Defines the grid size for displaying images within the album.
    gridSize: integer("grid_size"),
    // A hex code for the album's title color.
    titleColor: varchar("title_color", { length: 7 }),
    // A hex code for the album's description color.
    descriptionColor: varchar("description_color", { length: 7 }),
    // The font size for the album's title.
    titleFontSize: integer("title_font_size"),
    // A flag to indicate if the album should be displayed in a single row.
    singleRow: boolean("single_row").default(false),
  },
  (table) => {
    return {
      // Ensures that each album has a unique order within a given profile.
      albumOrderIdx: uniqueIndex("album_order_idx").on(
        table.profileId,
        table.albumOrder
      ),
    };
  }
);

// Relations for the Album Table.
// An album belongs to one profile and can have many images.
export const AlbumTableRelations = relations(AlbumTable, ({ one, many }) => ({
  profile: one(ProfileTable, {
    fields: [AlbumTable.profileId],
    references: [ProfileTable.id],
  }),
  images: many(ImageTable),
}));

// Image Table: Stores individual images.
export const ImageTable = pgTable("images", {
  // A unique identifier for each image, generated automatically.
  id: uuid("id").defaultRandom().primaryKey(),
  // The URL where the image is stored.
  imageUrl: varchar("image_url", { length: 2000 }).notNull(),
  // Alternative text for accessibility.
  altText: varchar("alt_text", { length: 30 }),
  // A caption for the image.
  caption: varchar("caption", { length: 150 }),
  // The location where the photo was taken.
  location: varchar("location", { length: 60 }),
  // Timestamp for when the image was uploaded.
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // Timestamp for when the image details were last updated.
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  // Foreign key linking to the album this image belongs to.
  albumId: uuid("album_id")
    .notNull()
    .references(() => AlbumTable.id, { onDelete: "cascade" }),
  // The display order of this image within its album.
  imageOrder: integer("image_order"),
});

// Relations for the Image Table.
// An image belongs to one album.
export const ImageTableRelations = relations(ImageTable, ({ one }) => ({
  album: one(AlbumTable, {
    fields: [ImageTable.albumId],
    references: [AlbumTable.id],
  }),
}));
