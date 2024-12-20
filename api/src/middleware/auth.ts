import { createMiddleware } from "hono/factory";
import { verify, type payloadSchema } from "../lib/auth";
import { z } from "zod";
import { eq } from "drizzle-orm";
import db from "../db";
import chalk from "chalk";

export type AuthVariables =
  | {
      user: typeof db.users.$inferSelect;
      session: z.infer<typeof payloadSchema>;
    }
  | { user: null; session: null };

export type Env = { Variables: AuthVariables };

const authMiddleware = createMiddleware<Env>(async (c, next) => {
  c.set("session", null);
  c.set("user", null);

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in .env");
  }

  const authorization = c.req.header("Authorization");
  const token = authorization?.match(/^Bearer (.+)$/)?.[1];

  if (token) {
    try {
      const payload = await verify(token, process.env.JWT_SECRET);

      const user = await db.query.users.findFirst({
        where: eq(db.users.id, payload.sub),
      });
      if (!user) throw null;

      c.set("session", payload);
      c.set("user", user);

      console.log(chalk.green("Valid token:"), payload);
    } catch (e) {
      console.log(chalk.red("Invalid token"));
    }
  }
  await next();
});
export default authMiddleware;
