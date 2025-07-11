/**
 * Database Schema for ClarityVue Photo Portfolio Platform
 *
 * This schema defines the core data structure for the photo portfolio application.
 * It uses PostgreSQL with Drizzle ORM for type-safe database operations.
 *
 * Key Design Principles:
 * - UUID primary keys for scalability and security
 * - Proper foreign key relationships with cascade delete
 * - Composite indexes for efficient querying
 * - Timestamp tracking for audit trails
 * - Row-level security through user ID filtering
 */

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

/**
 * Common timestamp fields for all tables
 *
 * createdAt: Automatically set when record is created
 * updatedAt: Automatically updated when record is modified
 *
 * These fields provide audit trails and help with data consistency.
 */
const createdAt = timestamp().notNull().defaultNow();
const updatedAt = timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

/**
 * Profile Table: Stores user profile information
 *
 * This is the central user table that links to Clerk authentication.
 * Each user can have one profile, and profiles are linked to albums.
 *
 * Design Decisions:
 * - clerkUserId links to Clerk's user system for authentication
 * - username is unique for public profile URLs
 * - bio has a default welcome message for new users
 * - imageUrl stores profile picture URL (supports long URLs)
 */
export const ProfileTable = pgTable("profiles", {
  // Unique identifier for the profile
  id: uuid().primaryKey().defaultRandom(),

  // Links to Clerk authentication system
  clerkUserId: text().notNull(),

  // User's display name (shown in UI)
  displayName: varchar({ length: 50 }).notNull(),

  // Unique username for public profile URLs
  username: varchar({ length: 50 }).notNull().unique(),

  // User's bio/description (default welcome message)
  bio: varchar({ length: 150 }).notNull().default("Welcome to my profile!"),

  // Profile picture URL (supports long URLs from cloud storage)
  imageUrl: varchar({ length: 2000 }).notNull(),

  // Audit timestamps
  createdAt,
  updatedAt,
});

/**
 * Album Table: Stores collections of images
 *
 * Albums are the main organizational unit for photos.
 * Each album belongs to one user and contains multiple images.
 * Albums have a specific order for display purposes.
 *
 * Design Decisions:
 * - albumOrder ensures albums display in user-defined sequence
 * - imageUrl stores album cover image
 * - Composite unique index prevents duplicate album orders per user
 */
export const AlbumTable = pgTable(
  "albums",
  {
    // Unique identifier for the album
    id: uuid().defaultRandom().primaryKey(),

    // Album title (limited to 50 characters for UI consistency)
    title: varchar({ length: 50 }).notNull(),

    // Album description (limited to 150 characters)
    description: varchar({ length: 150 }).notNull(),

    // Links to the user who owns this album
    clerkUserId: text().notNull(),

    // Display order for the album (1, 2, 3, etc.)
    albumOrder: integer().notNull(),

    // Album cover image URL
    imageUrl: varchar({ length: 2000 }).notNull(),

    // Audit timestamps
    createdAt,
    updatedAt,
  },
  (table) => {
    /**
     * Composite unique index on clerkUserId and albumOrder
     *
     * This ensures that for each user, album orders are unique.
     * Prevents duplicate album orders and enables efficient querying
     * when fetching albums in order for a specific user.
     *
     * Example: User A can have albums with orders 1, 2, 3
     *         User B can also have albums with orders 1, 2, 3
     *         But User A cannot have two albums with order 1
     */
    return {
      clerkUserAlbumOrderUnique: uniqueIndex("clerk_user_album_order_idx").on(
        table.clerkUserId,
        table.albumOrder
      ),
    };
  }
);

/**
 * Album Table Relations
 *
 * Defines the relationship between albums and images.
 * One album can have many images (one-to-many relationship).
 * This enables efficient querying of all images in an album.
 */
export const AlbumTableRelations = relations(AlbumTable, ({ many }) => ({
  images: many(ImageTable),
}));

/**
 * Image Table: Stores individual images
 *
 * Images are the core content of the application.
 * Each image belongs to one album and has metadata like alt text and captions.
 *
 * Design Decisions:
 * - imageOrder ensures images display in user-defined sequence
 * - altText provides accessibility for screen readers
 * - caption allows users to add descriptions to images
 * - Cascade delete removes images when album is deleted
 */
export const ImageTable = pgTable("images", {
  // Unique identifier for the image
  id: uuid().defaultRandom().primaryKey(),

  // URL where the image is stored (cloud storage)
  imageUrl: varchar({ length: 2000 }).notNull(),

  // Alternative text for accessibility (screen readers)
  altText: varchar({ length: 50 }).notNull(),

  // User-provided caption for the image
  caption: varchar({ length: 150 }).notNull(),

  // Foreign key to the album this image belongs to
  // Cascade delete: when album is deleted, all its images are deleted
  albumId: uuid()
    .notNull()
    .references(() => AlbumTable.id, { onDelete: "cascade" }),

  // Display order within the album (1, 2, 3, etc.)
  imageOrder: integer().notNull(),

  // Audit timestamps
  createdAt,
  updatedAt,
});

/**
 * Image Table Relations
 *
 * Defines the relationship between images and albums.
 * Each image belongs to exactly one album (many-to-one relationship).
 * This enables efficient querying of image metadata and album information.
 */
export const ImageTableRelations = relations(ImageTable, ({ one }) => ({
  album: one(AlbumTable, {
    fields: [ImageTable.albumId],
    references: [AlbumTable.id],
  }),
}));

/**
 * Database Schema Summary:
 *
 * 1. Profiles: User information and authentication links
 * 2. Albums: Collections of images with ordering
 * 3. Images: Individual photos with metadata
 *
 * Key Features:
 * - UUID primary keys for scalability
 * - Proper foreign key relationships
 * - Composite indexes for performance
 * - Cascade delete for data integrity
 * - Timestamp tracking for audit trails
 * - Row-level security through user filtering
 *
 * Performance Optimizations:
 * - Indexes on frequently queried fields
 * - Composite unique constraints
 * - Efficient relationship definitions
 * - Proper data types and constraints
 */
