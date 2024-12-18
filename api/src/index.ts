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

import { router } from "./lib/trpc";
import prescriptionsRouter from "./routers/prescriptions";
import { trpcServer } from "@hono/trpc-server";

dotenv.config();

const appRouter = router({
  prescriptions: prescriptionsRouter,
});
export type AppRouter = typeof appRouter;

const api = new Hono().route("/prescriptions", prescriptions);

const app = new Hono()
  .use(trimTrailingSlash())
  .use(logger())
  .use(cors())
  .use(authMiddleware)
  .use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
    })
  )
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
