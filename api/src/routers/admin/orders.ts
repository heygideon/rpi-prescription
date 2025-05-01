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
      const order = await db.query.orders.findFirst({
        where: eq(db.orders.id, input.id),
        with: {
          user: {
            columns: { title: true, firstName: true, lastName: true },
          },
        },
      });
      const orderCollection = await db.query.orderCollections.findFirst({
        where: eq(db.orderCollections.orderId, input.id),
      });

      return { ...order, orderCollection };
    }),

  prepare: authProcedure
    .input(
      z.object({
        id: z.number(),
        lockerNo: z
          .string()
          .regex(/^[A-Z]\d+$/)
          .default("A1"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const order = await db.query.orders.findFirst({
        where: eq(db.orders.id, input.id),
      });
      if (!order) throw new Error("Order not found");

      await db
        .delete(db.orderCollections)
        .where(eq(db.orderCollections.orderId, order.id));
      await db.insert(db.orderCollections).values({
        orderId: order.id,
        lockerNo: input.lockerNo,
        preparedBy: ctx.user.id,
      });
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
