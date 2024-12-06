import { Hono } from "hono";
import db from "../db";

export default new Hono().get("/", async (c) => {
  const rows = await db.query.orders.findMany({
    with: {
      user: {
        columns: { title: true, firstName: true, lastName: true },
      },
    },
  });
  return c.json(rows);
});
