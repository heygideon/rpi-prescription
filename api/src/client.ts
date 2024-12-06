import { hc } from "hono/client";
import type { App } from ".";

import * as schema from "./db/schema";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";

const client = hc<App>("http://localhost:3000");
export default client;

type TableKeys = {
  [K in keyof typeof schema]: (typeof schema)[K] extends PgTableWithColumns<any>
    ? K
    : never;
}[keyof typeof schema];

export type Table<
  K extends TableKeys,
  V extends "select" | "insert" = "select",
> = (typeof schema)[K][`$infer${Capitalize<V>}`];
