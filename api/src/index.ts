import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

import { cors } from "hono/cors";
import { trimTrailingSlash } from "hono/trailing-slash";

import chalk from "chalk";

import { createContext, router } from "./lib/trpc";
import prescriptionsRouter from "./routers/prescriptions";
import { trpcServer } from "@hono/trpc-server";
import authRouter from "./routers/auth";
import authRoute from "./auth";

const appRouter = router({
  prescriptions: prescriptionsRouter,
  auth: authRouter,
});
export type AppRouter = typeof appRouter;

const app = new Hono()
  .use(trimTrailingSlash())
  .use(logger())
  .use(cors())
  .use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
      createContext,
    })
  )
  .route("/auth", authRoute)
  .get("/", (c) => c.json({ success: true }));

export type App = typeof app;

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
