import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import db from "./db";
import { eq } from "drizzle-orm";
import sha256 from "./lib/sha256";
import { isAfter } from "date-fns";

const lockerApiRoute = new Hono().post(
  "/verify",
  zValidator(
    "json",
    z.object({
      id: z.coerce.number().int().positive(),
      code: z.string().min(1),
    })
  ),
  async (c) => {
    const { id, code } = c.req.valid("json");

    const orderCollection = await db.query.orderCollections.findFirst({
      where: eq(db.orderCollections.orderId, id),
    });
    if (!orderCollection)
      return c.json({ success: false, message: "Order not found" }, 404);

    const codeHash = await sha256(code);
    if (codeHash !== orderCollection.codeHash) {
      return c.json({ success: false, message: "Invalid code" }, 400);
    }
    if (
      !orderCollection.expiresAt ||
      isAfter(new Date(), orderCollection.expiresAt)
    ) {
      return c.json(
        { success: false, message: "Order collection expired" },
        400
      );
    }

    const collectedAt = new Date();

    await db
      .update(db.orderCollections)
      .set({
        collectedAt,
      })
      .where(eq(db.orderCollections.orderId, id));
    await db
      .update(db.orders)
      .set({
        status: "collected",
      })
      .where(eq(db.orders.id, id));

    setTimeout(async () => {
      // Undo the collection after 5 seconds
      await db.update(db.orderCollections).set({
        collectedAt: null,
        collectedBy: null,
        codeHash: null,
        expiresAt: null,
      });
      await db
        .update(db.orders)
        .set({
          status: "ready",
        })
        .where(eq(db.orders.id, id));
    }, 5000);

    return c.json({
      success: true,
      id,
      collectedAt,
      lockerNo: orderCollection.lockerNo,
    });
  }
);

export default lockerApiRoute;
