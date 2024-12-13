import { relations, sql } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  serial,
  text,
  integer,
  jsonb,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export type OpeningHours = {
  [day in "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"]: {
    open: string;
    close: string;
  };
};

export const users = pgTable("users", {
  id: serial().primaryKey(),
  title: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  createdAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const orderStatus = pgEnum("order_status", [
  "checking",
  "with_gp",
  "preparing",
  "ready",
  "collected",
]);

export const orders = pgTable("orders", {
  id: serial().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  pharmacyId: integer()
    .notNull()
    .references(() => pharmacies.id),
  status: orderStatus().notNull().default("checking"),
  collectedAt: timestamp(),
});
export const orderRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  pharmacy: one(pharmacies, {
    fields: [orders.pharmacyId],
    references: [pharmacies.id],
  }),
}));

export const orderCollections = pgTable("order_collections", {
  orderId: integer()
    .primaryKey()
    .notNull()
    .references(() => orders.id),
  createdAt: timestamp().defaultNow(),
  collectedBy: integer()
    .notNull()
    .references(() => users.id),
  isAboutToCollect: boolean().notNull().default(false),
  codeHash: text(),
  codeHashExpiresAt: timestamp(),
});

export const pharmacies = pgTable("pharmacies", {
  id: serial().primaryKey(),
  name: text().notNull(),
  address: text().notNull(),
  openingHours: jsonb().$type<OpeningHours>(),
});
