import { z } from "zod";
import { authNoVerifyProcedure, publicProcedure, router } from "../lib/trpc";
import { verify } from "@node-rs/argon2";
import { and, eq } from "drizzle-orm";
import db from "../db";
import { TRPCError } from "@trpc/server";
import { addDays, addMinutes, getUnixTime, isBefore } from "date-fns";
import { createAccessToken, createRefreshToken, sign } from "../lib/jwt";
import { sha256 } from "hono/utils/crypto";
import { customAlphabet } from "nanoid";
import chalk from "chalk";

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

      const accessToken = await createAccessToken(user);
      const refreshToken = await createRefreshToken(user);

      return { accessToken, refreshToken };
    }),

  getVerifyCode: authNoVerifyProcedure.query(async ({ ctx, input }) => {
    const { session, user } = ctx;
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
  verify: authNoVerifyProcedure
    .input(
      z.object({
        code: z.string().length(6).toUpperCase(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { session, user } = ctx;
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

      const accessToken = await createAccessToken(user, { verified: true });

      return { accessToken };
    }),
  refresh: publicProcedure
    .input(z.object({ refreshToken: z.string() }))
    .mutation(async ({ input }) => {
      const refreshTokenHash = await sha256(input.refreshToken);
      const row = await db.query.refreshTokens.findFirst({
        where: eq(db.refreshTokens.tokenHash, refreshTokenHash!),
        with: { user: { columns: { id: true } } },
      });
      // await db
      //   .delete(db.refreshTokens)
      //   .where(eq(db.refreshTokens.tokenHash, refreshTokenHash!));

      if (!row) {
        console.log("Invalid refresh token");
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      if (isBefore(row.expiresAt, new Date())) {
        console.log("Expired refresh token");
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const accessToken = await createAccessToken(row.user);
      const newRefreshToken = await createRefreshToken(row.user);

      return { accessToken, refreshToken: newRefreshToken };
    }),
});
export default authRouter;
