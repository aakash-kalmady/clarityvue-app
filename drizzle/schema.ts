import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const createdAt = timestamp().notNull().defaultNow();
const updatedAt = timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

// Profile Table: Stores user profile information.
export const ProfileTable = pgTable("profiles", {
  id: uuid().primaryKey().defaultRandom(),
  clerkUserId: text().notNull(),
  displayName: text().notNull(),
  username: text().notNull().unique(),
  bio: text().notNull().default("Welcome to my profile!"),
  imageUrl: text().notNull(),
  createdAt,
  updatedAt,
});

// Album Table: Stores collections of images.
export const AlbumTable = pgTable("albums", {
  id: uuid().defaultRandom().primaryKey(),
  title: text().notNull(),
  description: text(),
  clerkUserId: text().notNull(),
  albumOrder: integer(),
  createdAt,
  updatedAt,
});

// Relations for the Album Table.
// An album belongs to one profile and can have many images.
export const AlbumTableRelations = relations(AlbumTable, ({ many }) => ({
  images: many(ImageTable),
}));

// Image Table: Stores individual images.
export const ImageTable = pgTable("images", {
  // A unique identifier for each image, generated automatically.
  id: uuid().defaultRandom().primaryKey(),
  // The URL where the image is stored.
  imageUrl: text().notNull(),
  // Alternative text for accessibility.
  altText: text(),
  // A caption for the image.
  caption: text(),
  // Timestamp for when the image was uploaded.
  createdAt,
  updatedAt,
  // Foreign key linking to the album this image belongs to.
  albumId: uuid()
    .notNull()
    .references(() => AlbumTable.id, { onDelete: "cascade" }),
  // The display order of this image within its album.
  imageOrder: integer(),
});

// Relations for the Image Table.
// An image belongs to one album.
export const ImageTableRelations = relations(ImageTable, ({ one }) => ({
  album: one(AlbumTable, {
    fields: [ImageTable.albumId],
    references: [AlbumTable.id],
  }),
}));
