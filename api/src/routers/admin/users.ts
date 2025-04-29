import { eq } from "drizzle-orm";
import db from "../../db";
import { authProcedure, router } from "../../lib/trpc";
import { z } from "zod";

const adminUsersRouter = router({
  getAll: authProcedure.query(async () => {
    return await db.query.users.findMany({
      columns: {
        id: true,
        title: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
      },
      orderBy: db.users.id,
    });
  }),
  getOne: authProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.query.users.findFirst({
        where: eq(db.users.id, input.id),
        columns: {
          id: true,
          title: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          email: true,
        },
        with: {
          orders: {
            orderBy: db.orders.id,
          },
        },
      });
    }),
});

export default adminUsersRouter;
