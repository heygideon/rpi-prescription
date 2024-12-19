import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import db from "../db";
import { TRPCError } from "@trpc/server";
import { addMinutes, getUnixTime } from "date-fns";
import { sign } from "../lib/jwt";

const authRouter = router({
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
});
export default authRouter;
