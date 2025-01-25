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

import { createCallerFactory, createContext, router } from "./lib/trpc";
import prescriptionsRouter from "./routers/prescriptions";
import { trpcServer } from "@hono/trpc-server";
import authRouter from "./routers/auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

dotenv.config();

const appRouter = router({
  prescriptions: prescriptionsRouter,
  auth: authRouter,
});
export type AppRouter = typeof appRouter;

const createCaller = createCallerFactory(appRouter);

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
      createContext,
    })
  )
  .route("/api", api)
  .route("/auth", auth)
  .post(
    "/auth/refresh",
    zValidator(
      "json",
      z.object({
        refreshToken: z.string(),
      })
    ),
    async (c) => {
      const context = await createContext(undefined, c);
      const caller = createCaller(context);

      const { refreshToken: oldRefreshToken } = c.req.valid("json");
      const { accessToken, refreshToken } = await caller.auth.refresh({
        refreshToken: oldRefreshToken,
      });

      return c.json({ accessToken, refreshToken });
    }
  )
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
