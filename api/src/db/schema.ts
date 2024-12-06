import { sql } from "drizzle-orm";
import { timestamp, pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial().primaryKey(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  createdAt: timestamp().notNull().default(sql`now()`).$onUpdate(() => new Date())  
});

export const prescriptions = pgTable("prescriptions", {
  id: serial().primaryKey(),
  userId: integer().notNull().references(() => users.id),
  collectingUserId: integer().notNull().references(() => users.id),
})