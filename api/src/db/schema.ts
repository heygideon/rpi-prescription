/*
 -----------------------
 | New Postgres schema |
 -----------------------
*/
import { relations } from "drizzle-orm";
import {
  pgTable,
  pgSchema,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export type OpeningHours = {
  [day in "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"]: {
    open: string;
    close: string;
  };
};

export const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  phoneNumber: text("phone_number").notNull(),
});

export const verificationCodes = authSchema.table("verification_codes", {
  id: text("id").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  codeHash: text("code_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
export const verificationCodesRelations = relations(
  verificationCodes,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationCodes.userId],
      references: [users.id],
    }),
  })
);

export const refreshTokens = authSchema.table("refresh_tokens", {
  tokenHash: text("token_hash").notNull().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
});
export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));

export const orderStatusEnum = pgEnum("order_status", [
  "checking",
  "with_gp",
  "preparing",
  "ready",
  "collected",
]);

export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  pharmacyId: integer("pharmacy_id")
    .notNull()
    .references(() => pharmacies.id),
  status: orderStatusEnum("status").notNull().default("checking"),
  collectedAt: timestamp("collected_at"),
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
  orderId: integer("order_id")
    .primaryKey()
    .references(() => orders.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  collectedBy: integer("collected_by")
    .notNull()
    .references(() => users.id),
  isAboutToCollect: boolean("is_about_to_collect").notNull().default(false),
  codeHash: text("code_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const pharmacies = pgTable("pharmacies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  openingHours: jsonb("opening_hours").$type<OpeningHours>(),
});
