import { z } from "zod";
import db from "../../db";
import { authProcedure, router } from "../../lib/trpc";
import { desc, eq } from "drizzle-orm";
import { init } from "@paralleldrive/cuid2";
import sha256 from "../../lib/sha256";
import { addHours } from "date-fns";

const createCollectCode = init({
  length: 32,
});

const adminOrdersRouter = router({
  getAll: authProcedure.query(async () => {
    return await db.query.orders.findMany({
      with: {
        user: {
          columns: { title: true, firstName: true, lastName: true },
        },
      },
      orderBy: [desc(db.orders.createdAt), db.orders.id],
    });
  }),
  getOne: authProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.query.orders.findFirst({
        where: eq(db.orders.id, input.id),
        with: {
          user: {
            columns: { title: true, firstName: true, lastName: true },
          },
        },
      });
    }),

  genCode: authProcedure.query(async ({ ctx }) => {
    const code = createCollectCode();
    const codeHash = await sha256(code);
    const expiresAt = addHours(new Date(), 1);

    await db.insert(db.adminCodes).values({
      userId: ctx.user.id,
      codeHash,
      expiresAt,
      // isAboutToCollect: false,
    });

    return { code };
  }),
  prepare: authProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const order = await db.query.orders.findFirst({
        where: eq(db.orders.id, input.id),
      });
      if (!order) throw new Error("Order not found");

      await db
        .update(db.orders)
        .set({
          status: "ready",
        })
        .where(eq(db.orders.id, input.id));

      return { success: true };
    }),
});

export default adminOrdersRouter;
