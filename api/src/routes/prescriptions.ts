import { Hono } from "hono";
import db from "../db";
import { orderStatus } from "../db/schema";
import { inArray, ne } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export default new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      status: z
        .enum(orderStatus.enumValues)
        .array()
        .or(z.enum(orderStatus.enumValues))
        .default(orderStatus.enumValues),
    })
  ),
  async (c) => {
    await new Promise((r) => setTimeout(r, 500));
    const status = c.req.valid("query").status;
    const rows = await db.query.orders.findMany({
      with: {
        user: {
          columns: { title: true, firstName: true, lastName: true },
        },
      },
      where: inArray(
        db.orders.status,
        Array.isArray(status) ? status : [status]
      ),
    });

    const sorted = rows.toSorted(
      (a, b) =>
        orderStatus.enumValues.indexOf(b.status) -
        orderStatus.enumValues.indexOf(a.status)
    );

    return c.json(sorted);
  }
);
