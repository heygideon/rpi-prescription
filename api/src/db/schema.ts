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
  pgEnum,
} from "drizzle-orm/pg-core";

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
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

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
  status: orderStatusEnum("status").notNull().default("checking"),

  // TODO: remove
  collectedAt: timestamp("collected_at"),

  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export const orderRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderCollection: one(orderCollections, {
    fields: [orders.id],
    references: [orderCollections.orderId],
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
  collectedAt: timestamp("collected_at").notNull().defaultNow(),

  // TODO: remove
  isAboutToCollect: boolean("is_about_to_collect").notNull().default(false),

  codeHash: text("code_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
