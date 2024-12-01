// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  boolean, integer,
  pgTableCreator,
  serial,
  text,
  varchar
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const voters = createTable("voters", {
  id: serial("voter_id").notNull(),
  browserId: varchar("browser_id").notNull(),
  hasVoted: boolean("has-voted").notNull().default(false),
  createdLang: boolean("created-lang").notNull().default(false)
})

export const votes = createTable("votes", {
  id: serial("id").notNull(),
  voterId: integer("voter_id").notNull(),
  langId: integer("lang_id").notNull(),
})

export const langs = createTable("langs", {
  id: serial("lang_id").notNull(),
  name: text("lang_name").notNull(),
  description: text("lang_description").notNull(),
})