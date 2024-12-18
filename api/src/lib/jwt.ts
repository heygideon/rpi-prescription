import { sign as _sign, verify as _verify } from "hono/jwt";
import type { SignatureAlgorithm } from "hono/utils/jwt/jwa";
import type { SignatureKey } from "hono/utils/jwt/jws";
import { z } from "zod";

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
