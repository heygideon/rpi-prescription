import { getUnixTime, addMinutes, addDays, isBefore } from "date-fns";
import { sign as _sign, verify as _verify } from "hono/jwt";
import { sha256 } from "hono/utils/crypto";
import type { SignatureKey } from "hono/utils/jwt/jws";
import { z } from "zod";
import db from "../db";
import { init } from "@paralleldrive/cuid2";
import { customAlphabet } from "nanoid";
import { eq } from "drizzle-orm";
import chalk from "chalk";

export const payloadSchema = z.object({
  exp: z.number(),
  nbf: z.number(),
  iat: z.number(),
  sub: z.number(),
});

export const JWT = {
  async verify(token: string) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in .env");
    }
    const payload = await _verify(token, process.env.JWT_SECRET);
    return await payloadSchema.parseAsync(payload);
  },
};

export const Tokens = {
  _genRefreshToken: init({
    length: 32,
  }),
  async createAccessToken(user: Pick<typeof db.users.$inferSelect, "id">) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in .env");
    }
    return await _sign(
      {
        iat: getUnixTime(new Date()),
        exp: getUnixTime(addMinutes(new Date(), 15)),
        nbf: getUnixTime(new Date()),
        sub: user.id,
      } satisfies z.infer<typeof payloadSchema>,
      process.env.JWT_SECRET
    );
  },
  async createRefreshToken(user: Pick<typeof db.users.$inferSelect, "id">) {
    const refreshToken = this._genRefreshToken();
    const refreshTokenHash = await sha256(refreshToken);
    await db.insert(db.refreshTokens).values({
      tokenHash: refreshTokenHash!,
      userId: user.id,
      expiresAt: addDays(new Date(), 7),
    });

    return refreshToken;
  },
  async createTokenPair(user: Pick<typeof db.users.$inferSelect, "id">) {
    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken };
  },
  async refreshTokenPair(refreshToken: string) {
    const refreshTokenHash = await sha256(refreshToken);
    const row = await db.query.refreshTokens.findFirst({
      where: eq(db.refreshTokens.tokenHash, refreshTokenHash!),
    });
    await db
      .delete(db.refreshTokens)
      .where(eq(db.refreshTokens.tokenHash, refreshTokenHash!));

    if (!row) {
      throw new Error("Invalid refresh token");
    }
    if (isBefore(row.expiresAt, new Date())) {
      throw new Error("Expired refresh token");
    }

    return await this.createTokenPair({ id: row.userId });
  },
  async revokeRefreshToken(refreshToken: string) {
    const refreshTokenHash = await sha256(refreshToken);
    await db
      .delete(db.refreshTokens)
      .where(eq(db.refreshTokens.tokenHash, refreshTokenHash!));
  },
};

export const VerificationCodes = {
  _genSessionId: init({
    length: 32,
  }),
  _genDigits: customAlphabet("0123456789"),
  _genLetters: customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),

  async create(user: Pick<typeof db.users.$inferSelect, "id">) {
    const id = this._genSessionId();
    const code = this._genDigits(3) + this._genLetters(3);
    const codeHash = await sha256(code);
    const expiresAt = addMinutes(new Date(), 15);

    await db.insert(db.verificationCodes).values({
      id,
      userId: user.id,
      codeHash: codeHash!,
      expiresAt,
    });

    console.log("");
    console.log(chalk.bold.blue(`Verification code for user ${user.id}`));
    console.log(chalk.gray(` | code: ${chalk.bold.white(code)}`));
    console.log(chalk.gray(` | codeHash: ${codeHash}`));
    console.log("");

    return { id, expiresAt, unsafe_code: code };
  },

  async verify(id: string, code: string) {
    const row = await db.query.verificationCodes.findFirst({
      where: eq(db.verificationCodes.id, id),
      with: { user: { columns: { id: true } } },
    });
    if (!row) {
      throw new Error("Invalid code");
    }
    if (isBefore(row.expiresAt, new Date())) {
      throw new Error("Code expired");
    }

    const codeHash = await sha256(code);
    if (row.codeHash !== codeHash) {
      throw new Error("Invalid code");
    }

    await db
      .delete(db.verificationCodes)
      .where(eq(db.verificationCodes.id, id));

    return { user: row.user };
  },
};
