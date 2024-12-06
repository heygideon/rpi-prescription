import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import * as schema from "./schema";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";

const client = new PGlite("./.db");
const db = drizzle({ client, schema });

type Schema = {
  [K in keyof typeof schema as (typeof schema)[K] extends PgTableWithColumns<any>
    ? K
    : never]: (typeof schema)[K];
};

export default Object.assign(db, schema as Schema);
