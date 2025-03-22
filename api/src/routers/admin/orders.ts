import db from "../../db";
import { publicProcedure, router } from "../../lib/trpc";

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
});

export default adminOrdersRouter;
