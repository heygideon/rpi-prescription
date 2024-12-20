import type { Env } from "../middleware/auth";
import { zValidator } from "@hono/zod-validator";
import { verify } from "../lib/passwords";
import { Hono } from "hono";
import z from "zod";
import db from "../db";
import { eq } from "drizzle-orm";
import { sign } from "../lib/auth";
import { addMinutes, getUnixTime } from "date-fns";

export default new Hono<Env>()
  .get("/me", async (c) => {
    const { session, user } = c.var;
    if (!session) return c.text("Unauthorized", { status: 401 });

    return c.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: session.verified ? user.phoneNumber : null,
      },
      session: {
        sub: session.sub,
        verified: session.verified,
      },
    });
  })
  .post(
    "/login",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");

      const user = await db.query.users.findFirst({
        where: eq(db.users.email, email),
      });

      if (!user || !verify(user.passwordHash, password)) {
        return c.text("Invalid email or password", { status: 401 });
      }

      const accessToken = await sign(
        {
          iat: getUnixTime(new Date()),
          exp: getUnixTime(addMinutes(new Date(), 15)),
          nbf: getUnixTime(new Date()),
          sub: user.id,
          verified: false,
        },
        process.env.JWT_SECRET!
      );
      // TODO: generate + store refresh token

      return c.json({ accessToken });
    }
  );
