import { hc } from "hono/client";
import type { App } from ".";

import type { Schema } from "./db";

const client = hc<App>("http://localhost:3000");
export default client;

export type Table<
  K extends keyof Schema,
  V extends "select" | "insert" = "select",
> = Schema[K][`$infer${Capitalize<V>}`];
