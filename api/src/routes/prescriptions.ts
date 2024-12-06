import { Hono } from "hono";
import db from "../db";

export default new Hono().get("/", async (c) => {
  const rows = await db.select().from(db.orders);
  return c.json(rows);
});
