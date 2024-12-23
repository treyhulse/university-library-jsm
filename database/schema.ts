import {
  integer,
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);

export const users = pgTable("users", {
  id: uuid().notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar().notNull(),
  email: text().notNull().unique(),
  universityId: integer().notNull(),
  universityCard: text().notNull(),
  password: text().notNull(),
  status: statusEnum().default("PENDING"),
  lastActivityDate: date().defaultNow(),
  createdAt: timestamp().defaultNow(),
});
