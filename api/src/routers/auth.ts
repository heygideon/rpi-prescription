import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";
import { verify } from "@node-rs/argon2";
import { and, eq } from "drizzle-orm";
import db from "../db";
import { TRPCError } from "@trpc/server";
import { addDays, addMinutes, getUnixTime, isBefore } from "date-fns";
import { sign } from "../lib/jwt";
import { sha256 } from "hono/utils/crypto";
import { init } from "@paralleldrive/cuid2";
import { customAlphabet } from "nanoid";
import chalk from "chalk";

const createRefreshToken = init({
  length: 32,
});
const createVerifyCode = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

const authRouter = router({
  me: publicProcedure.query(async ({ ctx }) => {
    const { session, user } = ctx;
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

    await new Promise((r) => setTimeout(r, 500));

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        email: user.email,
        phoneNumber: session.verified ? user.phoneNumber : null,
      },
      session: {
        sub: session.sub,
        verified: session.verified,
      },
    };
  }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const user = await db.query.users.findFirst({
        where: eq(db.users.email, email),
      });
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
      }

      const valid = await verify(user.passwordHash, password);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password",
        });
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
      // TODO: generate + store refresh token (after 2fa)

      return { accessToken };
    }),

  getVerifyCode: publicProcedure.query(async ({ ctx, input }) => {
    const { session, user } = ctx;
    if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

    if (session.verified) throw new TRPCError({ code: "NOT_IMPLEMENTED" });

    const code = createVerifyCode();
    const codeHash = await sha256(code);
    await db.insert(db.verificationCodes).values({
      userId: user.id,
      codeHash: codeHash!,
      codeHashExpiresAt: addMinutes(new Date(), 15),
    });

    console.log("");
    console.log(chalk.bold.blue(`Verification code for user ${user.id}`));
    console.log(chalk.gray(` | Code: ${code}`));
    console.log(chalk.gray(` | Saved hash: ${chalk.bold.white(codeHash)}`));

    return {
      phoneNumberPartial: user.phoneNumber.slice(-4),
    };
  }),
  verify: publicProcedure
    .input(
      z.object({
        code: z.string().length(6),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { session, user } = ctx;
      if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

      if (session.verified) throw new TRPCError({ code: "NOT_IMPLEMENTED" });

      const codeHash = await sha256(input.code);
      const row = await db.query.verificationCodes.findFirst({
        where: and(
          eq(db.verificationCodes.userId, user.id),
          eq(db.verificationCodes.codeHash, codeHash!)
        ),
      });
      await db
        .delete(db.verificationCodes)
        .where(
          and(
            eq(db.verificationCodes.userId, user.id),
            eq(db.verificationCodes.codeHash, codeHash!)
          )
        );

      if (!row) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid code",
        });
      }
      if (isBefore(row.codeHashExpiresAt, new Date())) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Code expired",
        });
      }

      const accessToken = await sign(
        {
          iat: getUnixTime(new Date()),
          exp: getUnixTime(addMinutes(new Date(), 15)),
          nbf: getUnixTime(new Date()),
          sub: user.id,
          verified: true,
        },
        process.env.JWT_SECRET!
      );
      const refreshToken = createRefreshToken();
      const refreshTokenHash = await sha256(refreshToken);
      await db.insert(db.refreshTokens).values({
        tokenHash: refreshTokenHash!,
        userId: user.id,
        expiresAt: addDays(new Date(), 7),
      });

      return { accessToken, refreshToken };
    }),
});
export default authRouter;
