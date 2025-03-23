import { z } from "zod";
import db from "../../db";
import { publicProcedure, router } from "../../lib/trpc";
import { eq } from "drizzle-orm";

const adminOrdersRouter = router({
  getAll: publicProcedure.query(async () => {
    await new Promise((r) => setTimeout(r, 500));

    return await db.query.orders.findMany({
      with: {
        user: {
          columns: { title: true, firstName: true, lastName: true },
        },
      },
      orderBy: db.orders.id,
    });
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      await new Promise((r) => setTimeout(r, 500));

      return await db.query.orders.findFirst({
        where: eq(db.orders.id, input.id),
        with: {
          user: {
            columns: { title: true, firstName: true, lastName: true },
          },
        },
      });
    }),
});

export default adminOrdersRouter;
