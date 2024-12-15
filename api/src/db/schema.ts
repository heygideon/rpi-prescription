import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export type OpeningHours = {
  [day in "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"]: {
    open: string;
    close: string;
  };
};

export const users = sqliteTable("users", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
});

export const orderStatusValues = [
  "checking",
  "with_gp",
  "preparing",
  "ready",
  "collected",
] as const;

export const orders = sqliteTable("orders", {
  id: integer().primaryKey({ autoIncrement: true }),
  userId: integer()
    .notNull()
    .references(() => users.id),
  pharmacyId: integer()
    .notNull()
    .references(() => pharmacies.id),
  status: text({ enum: orderStatusValues }).notNull().default("checking"),
  collectedAt: integer({ mode: "timestamp" }).default(sql`(unixepoch())`),
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

export const orderCollections = sqliteTable(
  "order_collections",
  {
    orderId: integer()
      .primaryKey({ autoIncrement: true })
      .references(() => orders.id),
    createdAt: integer({ mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    collectedBy: integer()
      .notNull()
      .references(() => users.id),
    isAboutToCollect: integer({ mode: "boolean" }).notNull().default(false),
    codeHash: text(),
    codeHashExpiresAt: integer({ mode: "timestamp" }),
  },
  (t) => [uniqueIndex("order_collections_orderId").on(t.orderId)]
);

export const pharmacies = sqliteTable("pharmacies", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  address: text().notNull(),
  openingHours: text({ mode: "json" }).$type<OpeningHours>(),
});
