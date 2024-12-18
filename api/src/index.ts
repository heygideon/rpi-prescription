import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import prescriptions from "./routes/prescriptions";
import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";
import auth from "./routes/auth";

import chalk from "chalk";
import dotenv from "dotenv";
import authMiddleware from "./middleware/auth";

dotenv.config();

const api = new Hono().route("/prescriptions", prescriptions);

const app = new Hono()
  .use(trimTrailingSlash())
  .use(logger())
  .use(cors())
  .use(authMiddleware)
  .route("/api", api)
  .route("/auth", auth)
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
