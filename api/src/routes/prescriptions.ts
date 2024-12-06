import { Hono } from "hono";
import db from "../db";

export default new Hono().get("/", async (c) => {
  await new Promise((r) => setTimeout(r, 500));
  const rows = await db.query.orders.findMany({
    with: {
      user: {
        columns: { title: true, firstName: true, lastName: true },
      },
    },
  });
  return c.json(rows);
});
