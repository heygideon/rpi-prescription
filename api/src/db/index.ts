import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import * as schema from "./schema";

const client = new PGlite("./.db");
const db = drizzle({ client });

export default Object.assign(db, schema);
