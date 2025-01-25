import type { Schema } from "./db";

export type { AppRouter } from ".";

export type Table<
  K extends keyof Schema,
  V extends "select" | "insert" = "select",
> = Schema[K][`$infer${Capitalize<V>}`];
