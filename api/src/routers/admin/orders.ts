import { z } from "zod";
import db from "../../db";
import { authProcedure, router } from "../../lib/trpc";
import { desc, eq } from "drizzle-orm";

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
