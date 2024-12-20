import { z } from "zod";
import { authNoVerifyProcedure, publicProcedure, router } from "../lib/trpc";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import db from "../db";
import { TRPCError } from "@trpc/server";
import { isBefore } from "date-fns";
import {
  createAccessToken,
  createRefreshToken,
  createVerificationCode,
} from "../lib/auth";
import { sha256 } from "hono/utils/crypto";
import chalk from "chalk";
import { hash } from "../lib/passwords";

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
        await hash(password);
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

      const { id, code, codeHash } = await createVerificationCode(user);

      console.log("");
      console.log(chalk.bold.blue(`Verification code for user ${user.id}`));
      console.log(chalk.gray(` | Code: ${code}`));
      console.log(chalk.gray(` | Saved hash: ${chalk.bold.white(codeHash)}`));

      return {
        sessionId: id,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          email: user.email,
          phoneNumberPartial: user.phoneNumber.slice(-4),
        },
      };
    }),

  getVerifyCode: authNoVerifyProcedure.query(async ({ ctx }) => {
    const { session, user } = ctx;
    if (session.verified) throw new TRPCError({ code: "NOT_IMPLEMENTED" });

    const { code, codeHash } = await createVerificationCode(user);

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
        sessionId: z.string(),
        code: z.string().length(6).toUpperCase(),
      })
    )
    .mutation(async ({ input }) => {
      const row = await db.query.verificationCodes.findFirst({
        where: eq(db.verificationCodes.id, input.sessionId),
        with: { user: { columns: { id: true } } },
      });
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

      const codeHash = await sha256(input.code);
      if (row.codeHash !== codeHash) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid code",
        });
      }

      await db
        .delete(db.verificationCodes)
        .where(eq(db.verificationCodes.id, input.sessionId));

      const accessToken = await createAccessToken(row.user, { verified: true });
      const refreshToken = await createRefreshToken(row.user);

      return { accessToken, refreshToken };
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
