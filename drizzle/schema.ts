import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const createdAt = timestamp().notNull().defaultNow();
const updatedAt = timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

// Profile Table: Stores user profile information.
export const ProfileTable = pgTable("profiles", {
  // A unique identifier for each profile page, generated automatically.
  id: uuid().primaryKey().defaultRandom(),
  // The user ID from your authentication provider (e.g., Clerk).
  clerkUserId: text().notNull(),
  displayName: text().notNull(),
  // The user's chosen username, must be unique.
  username: text().notNull().unique(),
  // A short biography for the user.
  bio: text().notNull().default("Welcome to my profile!"),
  // A hex code for the profile's background color.
  backgroundColor: text().notNull().default("FFFFFF"),
  imageUrl: text().notNull(),
  // Timestamp for when the profile was last updated. Updates automatically.
  createdAt,
  updatedAt,
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
    id: uuid().defaultRandom().primaryKey(),
    // The title of the album.
    title: text().notNull(),
    // A detailed description of the album.
    description: text(),
    // Foreign key linking to the profile this album belongs to.
    profileId: uuid()
      .notNull()
      .references(() => ProfileTable.id, { onDelete: "cascade" }),
    // The display order of this album on the profile page.
    albumOrder: integer(),
    // Timestamp for when the album was created.
    createdAt,
    updatedAt,
    // Defines the grid size for displaying images within the album.
    gridSize: integer(),
    // A hex code for the album's title color.
    titleColor: text(),
    // A hex code for the album's description color.
    descriptionColor: text(),
    // The font size for the album's title.
    titleFontSize: integer(),
    // A flag to indicate if the album should be displayed in a single row.
    singleRow: boolean().default(false),
  },
  (table) => {
    return {
      // Ensures that each album has a unique order within a given profile.
      albumOrderIdx: uniqueIndex().on(table.profileId, table.albumOrder),
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
  id: uuid().defaultRandom().primaryKey(),
  // The URL where the image is stored.
  imageUrl: text().notNull(),
  // Alternative text for accessibility.
  altText: text(),
  // A caption for the image.
  caption: text(),
  // The location where the photo was taken.
  location: text(),
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
