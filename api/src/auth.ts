import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import db from "./db";
import { eq } from "drizzle-orm";
import { hash, verify } from "./lib/passwords";
import { Tokens, VerificationCodes } from "./lib/auth";

const authRoute = new Hono()
  .post(
    "/login",
    zValidator(
      "json",
      z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
      })
    ),
    async (c) => {
      const { email, password } = c.req.valid("json");

      const user = await db.query.users.findFirst({
        where: eq(db.users.email, email),
      });

      if (!user) {
        await hash(password);
        return c.text("Invalid email or password", 401);
      }

      const valid = await verify(user.passwordHash, password);
      if (!valid) {
        return c.text("Invalid email or password", 401);
      }

      const { id, expiresAt } = await VerificationCodes.create(user);

      return c.json({
        sessionId: id,
        expiresAt: expiresAt.toISOString(),
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumberPartial: user.phoneNumber.slice(-4),
        },
      });
    }
  )
  .post(
    "/verify",
    zValidator(
      "json",
      z.object({
        sessionId: z.string(),
        code: z.string().length(6).toUpperCase(),
      })
    ),
    async (c) => {
      const { sessionId, code } = c.req.valid("json");

      try {
        const { user } = await VerificationCodes.verify(sessionId, code);

        const tokens = await Tokens.createTokenPair(user);
        return c.json(tokens);
      } catch (e) {
        if (e instanceof Error) {
          return c.text(e.message, 401);
        } else {
          return c.text("Invalid code", 401);
        }
      }
    }
  )
  .post(
    "/refresh",
    zValidator(
      "json",
      z.object({
        refreshToken: z.string(),
      })
    ),
    async (c) => {
      const { refreshToken } = c.req.valid("json");

      try {
        const tokens = await Tokens.refreshTokenPair(refreshToken);
        return c.json(tokens);
      } catch (e) {
        if (e instanceof Error) {
          return c.text(e.message, 401);
        } else {
          return c.text("Invalid refresh token", 401);
        }
      }
    }
  )
  .post(
    "/logout",
    zValidator(
      "json",
      z.object({
        refreshToken: z.string(),
      })
    ),
    async (c) => {
      const { refreshToken } = c.req.valid("json");

      try {
        await Tokens.revokeRefreshToken(refreshToken);
        return c.text("", 200);
      } catch (e) {
        if (e instanceof Error) {
          return c.text(e.message, 401);
        } else {
          return c.text("Invalid refresh token", 401);
        }
      }
    }
  );

export type AuthRoute = typeof authRoute;
export default authRoute;
