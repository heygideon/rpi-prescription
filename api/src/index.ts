import "dotenv/config";

import { app } from "./app";
import { serve } from "@hono/node-server";
import chalk from "chalk";

const port = Number(process.env.PORT) || 3000;
console.log(
  chalk.yellow(
    `🔥 Server running on ${
      process.env.NODE_ENV === "production" ? "" : "http://localhost"
    }:${port}`
  )
);

serve({
  fetch: app.fetch,
  port,
});
