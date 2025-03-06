import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, schema });

export type Schema = {
  [K in keyof typeof schema as (typeof schema)[K] extends PgTableWithColumns<any>
    ? K
    : never]: (typeof schema)[K];
};

export default Object.assign(db, schema as Schema);
