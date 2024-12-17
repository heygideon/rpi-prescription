import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import chalk from "chalk";
import prescriptions from "./routes/prescriptions";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";

const api = new Hono().route("/prescriptions", prescriptions);

const app = new Hono()
  .use(trimTrailingSlash())
  .use(logger())
  .use(cors())
  .route("/api", api)
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
