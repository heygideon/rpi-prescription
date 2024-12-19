import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import db from "../db";
import { TRPCError } from "@trpc/server";
import { addMinutes, getUnixTime } from "date-fns";
import { sign } from "../lib/jwt";

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
});
export default authRouter;
