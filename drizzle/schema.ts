import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
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
  displayName: varchar({ length: 50 }).notNull(),
  username: varchar({ length: 50 }).notNull().unique(),
  bio: varchar({ length: 150 }).notNull().default("Welcome to my profile!"),
  imageUrl: varchar({ length: 2000 }).notNull(),
  createdAt,
  updatedAt,
});

// Album Table: Stores collections of images.
export const AlbumTable = pgTable(
  "albums",
  {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar({ length: 50 }).notNull(),
    description: varchar({ length: 150 }).notNull(),
    clerkUserId: text().notNull(),
    albumOrder: integer().notNull(),
    imageUrl: varchar({ length: 2000 }).notNull(),
    createdAt,
    updatedAt,
  },
  (table) => {
    // Add a composite unique index on clerkUserId and albumOrder.
    // This ensures that for a specific user (clerkUserId), each albumOrder value is unique.
    return {
      clerkUserAlbumOrderUnique: uniqueIndex("clerk_user_album_order_idx").on(
        table.clerkUserId,
        table.albumOrder
      ),
    };
  }
);

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
  imageUrl: varchar({ length: 2000 }).notNull(),
  // Alternative text for accessibility.
  altText: varchar({ length: 50 }).notNull(),
  // A caption for the image.
  caption: varchar({ length: 150 }).notNull(),
  // Timestamp for when the image was uploaded.
  createdAt,
  updatedAt,
  // Foreign key linking to the album this image belongs to.
  albumId: uuid()
    .notNull()
    .references(() => AlbumTable.id, { onDelete: "cascade" }),
  // The display order of this image within its album.
  imageOrder: integer().notNull(),
});

// Relations for the Image Table.
// An image belongs to one album.
export const ImageTableRelations = relations(ImageTable, ({ one }) => ({
  album: one(AlbumTable, {
    fields: [ImageTable.albumId],
    references: [AlbumTable.id],
  }),
}));
