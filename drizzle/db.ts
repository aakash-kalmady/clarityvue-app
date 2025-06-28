import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { toSnakeCase } from "drizzle-orm/casing";
// initialize the neon client using the DATABASE_URL from your environment variables
const sql = neon(process.env.DATABASE_URL!);

// create and export the drizzle ORM instance, with the neon client and schema for type-safe queries
export const db = drizzle(sql, { schema });
