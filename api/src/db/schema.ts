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
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),

  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

export const verificationCodes = sqliteTable("verification_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  codeHash: text("code_hash").notNull(),
  codeHashExpiresAt: integer("code_hash_expires_at", {
    mode: "timestamp",
  }).notNull(),
});

export const refreshTokens = sqliteTable("refresh_tokens", {
  tokenHash: text("token_hash").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});
export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));

export const orderStatusValues = [
  "checking",
  "with_gp",
  "preparing",
  "ready",
  "collected",
] as const;

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  pharmacyId: integer("pharmacy_id")
    .notNull()
    .references(() => pharmacies.id),
  status: text("status", { enum: orderStatusValues })
    .notNull()
    .default("checking"),
  collectedAt: integer("collected_at", { mode: "timestamp" }),
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
    orderId: integer("order_id")
      .primaryKey({ autoIncrement: true })
      .references(() => orders.id),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    collectedBy: integer("collected_by")
      .notNull()
      .references(() => users.id),
    isAboutToCollect: integer("is_about_to_collect", { mode: "boolean" })
      .notNull()
      .default(false),
    codeHash: text("code_hash").notNull(),
    codeHashExpiresAt: integer("code_hash_expires_at", {
      mode: "timestamp",
    }).notNull(),
  },
  (t) => [uniqueIndex("order_collections_order_id").on(t.orderId)]
);

export const pharmacies = sqliteTable("pharmacies", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  address: text().notNull(),
  openingHours: text({ mode: "json" }).$type<OpeningHours>(),
});
