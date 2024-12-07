import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import chalk from "chalk";
import prescriptions from "./routes/prescriptions";
import { cors } from "hono/cors";

const app = new Hono()
  .use(logger())
  .use(cors())
  .route("/prescriptions", prescriptions)
  .get("/", (c) => {
    return c.text("Hello Hono!");
  });
export type App = typeof app;

const port = 3000;
console.log(chalk.yellow(`🔥 Server running on http://localhost:${port}`));

serve({
  fetch: app.fetch,
  port,
});
