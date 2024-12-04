import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import chalk from "chalk";

const app = new Hono();
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(chalk.yellow(`🔥 Server running on http://localhost:${port}`));

serve({
  fetch: app.fetch,
  port,
});
