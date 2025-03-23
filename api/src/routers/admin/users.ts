import db from "../../db";
import { publicProcedure, router } from "../../lib/trpc";

const adminUsersRouter = router({
  getAll: publicProcedure.query(async () => {
    await new Promise((r) => setTimeout(r, 500));

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
});

export default adminUsersRouter;
