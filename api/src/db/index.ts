import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";
import type { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

const client = createClient({
  url: "file:./data.db",
});
const db = drizzle({ client, schema, logger: true });

export type Schema = {
  [K in keyof typeof schema as (typeof schema)[K] extends SQLiteTableWithColumns<any>
    ? K
    : never]: (typeof schema)[K];
};

export default Object.assign(db, schema as Schema);
