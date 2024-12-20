import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Context as HonoContext } from "hono";
import type { z } from "zod";
import db from "../db";
import { payloadSchema, verify } from "./auth";
import { eq } from "drizzle-orm";
import chalk from "chalk";

type Context =
  | {
      user: typeof db.users.$inferSelect;
      session: z.infer<typeof payloadSchema>;
    }
  | { user: null; session: null };

const t = initTRPC.context<Context>().create();

export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const publicProcedure = t.procedure;
export const authNoVerifyProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});
export const authProcedure = authNoVerifyProcedure.use(({ ctx, next }) => {
  if (!ctx.session.verified) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});

export const createContext = async (
  // _opts: FetchCreateContextFnOptions,
  _opts: any,
  c: HonoContext
): Promise<Context> => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
  }

  const authorization = c.req.header("Authorization");
  const token = authorization?.match(/^Bearer (.+)$/)?.[1];

  if (!token) return { user: null, session: null };

  try {
    const session = await verify(token, process.env.JWT_SECRET);

    const user = await db.query.users.findFirst({
      where: eq(db.users.id, session.sub),
    });
    if (!user) throw null;

    console.log(chalk.green("Valid token:"), session);

    return {
      session,
      user,
    };
  } catch (e) {
    console.log(chalk.red("Invalid token"));
    return { user: null, session: null };
  }
};
