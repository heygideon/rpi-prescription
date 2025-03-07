import { initTRPC, TRPCError } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Context as HonoContext } from "hono";
import type { z } from "zod";
import db from "../db";
import { JWT, payloadSchema } from "./auth";
import { eq } from "drizzle-orm";
import chalk from "chalk";
import { fromUnixTime, format } from "date-fns";

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
export const authProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx,
  });
});

export const createContext = async (
  _opts: FetchCreateContextFnOptions,
  c: HonoContext
): Promise<Context> => {
  const authorization = c.req.header("Authorization");
  const token = authorization?.match(/^Bearer (.+)$/)?.[1];

  if (!token) return { user: null, session: null };

  try {
    const session = await JWT.verify(token);

    const [user] = await db
      .select()
      .from(db.users)
      .where(eq(db.users.id, session.sub));
    if (!user) throw null;

    console.log("");
    console.log(chalk.bold.magentaBright("Valid token"));
    console.log(
      chalk.gray(
        ` | exp: ${format(fromUnixTime(session.exp), "yyyy-MM-dd HH:mm:ss")}`
      )
    );
    console.log(
      chalk.gray(
        ` | nbf: ${format(fromUnixTime(session.nbf), "yyyy-MM-dd HH:mm:ss")}`
      )
    );
    console.log(
      chalk.gray(
        ` | iat: ${format(fromUnixTime(session.iat), "yyyy-MM-dd HH:mm:ss")}`
      )
    );
    console.log(
      chalk.gray(` | sub: ${session.sub} ${chalk.italic(`(${user.email})`)}`)
    );
    console.log("");

    return {
      session,
      user,
    };
  } catch (e) {
    console.log("");
    console.log(chalk.bold.redBright("Valid token"));
    if (e instanceof Error) {
      console.log(chalk.gray(` | ${e.message}`));
    }
    console.log("");

    return { user: null, session: null };
  }
};
