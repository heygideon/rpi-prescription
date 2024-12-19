import { getUnixTime, addMinutes, addDays } from "date-fns";
import { sign as _sign, verify as _verify } from "hono/jwt";
import { sha256 } from "hono/utils/crypto";
import type { SignatureKey } from "hono/utils/jwt/jws";
import { z } from "zod";
import db from "../db";
import { init } from "@paralleldrive/cuid2";

const genRefreshToken = init({
  length: 32,
});

export const payloadSchema = z.object({
  exp: z.number(),
  nbf: z.number(),
  iat: z.number(),

  sub: z.number(),
  verified: z.boolean(),
});
type Payload = z.infer<typeof payloadSchema>;

export async function sign(
  payload: Payload,
  privateKey: SignatureKey
): Promise<string> {
  return await _sign(payload, privateKey);
}
export async function verify(
  token: string,
  publicKey: SignatureKey
): Promise<Payload> {
  const payload = await _verify(token, publicKey);
  return await payloadSchema.parseAsync(payload);
}

export async function createAccessToken(
  user: Pick<typeof db.users.$inferSelect, "id">,
  { verified = false }: { verified?: boolean } = {}
) {
  return await sign(
    {
      iat: getUnixTime(new Date()),
      exp: getUnixTime(addMinutes(new Date(), 15)),
      nbf: getUnixTime(new Date()),
      sub: user.id,
      verified,
    },
    process.env.JWT_SECRET!
  );
}
export async function createRefreshToken(
  user: Pick<typeof db.users.$inferSelect, "id">
) {
  const refreshToken = genRefreshToken();
  const refreshTokenHash = await sha256(refreshToken);
  await db.insert(db.refreshTokens).values({
    tokenHash: refreshTokenHash!,
    userId: user.id,
    expiresAt: addDays(new Date(), 7),
  });

  return refreshToken;
}
