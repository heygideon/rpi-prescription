import { Hono } from "hono";
import db from "../db";
import { orderStatusValues } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { init } from "@paralleldrive/cuid2";
import { sha256 } from "hono/utils/crypto";
import chalk from "chalk";
import { addHours, isAfter } from "date-fns";

const createCollectCode = init({
  length: 32,
});

export default new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        status: z
          .enum(orderStatusValues)
          .array()
          .or(z.enum(orderStatusValues))
          .default([...orderStatusValues]),
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
          orderStatusValues.indexOf(b.status) -
          orderStatusValues.indexOf(a.status)
      );

      return c.json(sorted);
    }
  )
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.coerce.number(),
      })
    ),
    async (c) => {
      await new Promise((r) => setTimeout(r, 500));
      const id = c.req.valid("param").id;
      const row = await db.query.orders.findFirst({
        where: eq(db.orders.id, id),
      });
      if (!row) return c.text("Not found", 404);

      return c.json(row);
    }
  )
  .post(
    "/:id/collect/gen-code",
    zValidator(
      "param",
      z.object({
        id: z.coerce.number(),
      })
    ),
    zValidator(
      "json",
      z.object({
        postcodeHalf: z.string().toUpperCase(),
      })
    ),
    async (c) => {
      await new Promise((r) => setTimeout(r, 500));
      const { id } = c.req.valid("param");
      const { postcodeHalf } = c.req.valid("json");

      const order = await db.query.orders.findFirst({
        where: eq(db.orders.id, id),
      });
      if (!order) return c.text("Not found", 404);
      if (order.status !== "ready") return c.text("Order not ready", 403);
      // TODO: verify prescription user id

      if (!/[0-9]{1}[A-Z]{2}/.test(postcodeHalf)) {
        return c.text("Invalid postcode", 401);
      }
      // TODO: verify postcode half with user

      const code = createCollectCode();
      const codeHash = await sha256(code);
      console.log(code, codeHash);

      // TODO: if order collection item does not exist, return 404
      // to wait for a locker to be assigned

      await db
        .insert(db.orderCollections)
        .values({
          orderId: id,
          codeHash: codeHash!,
          codeHashExpiresAt: addHours(new Date(), 1),
          collectedBy: 1,
          isAboutToCollect: false,
        })
        .onConflictDoUpdate({
          target: [db.orderCollections.orderId],
          set: {
            codeHash: codeHash!,
            codeHashExpiresAt: addHours(new Date(), 1),
            collectedBy: 1,
            isAboutToCollect: false,
          },
        });

      console.log("");
      console.log(chalk.bold.yellow(`Generated code for #${id}`));
      console.log(chalk.gray(` | Code: ${code}`));
      console.log(chalk.gray(` | Saved hash: ${codeHash}`));

      return c.json({ code });
    }
  )
  .post(
    "/:id/collect/before-unlock",
    zValidator(
      "param",
      z.object({
        id: z.coerce.number(),
      })
    ),
    async (c) => {
      await new Promise((r) => setTimeout(r, 500));
      const orderCollection = await db.query.orderCollections.findFirst({
        where: eq(db.orderCollections.orderId, c.req.valid("param").id),
      });
      if (!orderCollection) return c.text("Not found", 404);

      await db
        .update(db.orderCollections)
        .set({ isAboutToCollect: true })
        .where(eq(db.orderCollections.orderId, c.req.valid("param").id));

      console.log("");
      console.log(
        chalk.bold.yellow(`About to unlock #${orderCollection.orderId}`)
      );
      console.log(chalk.gray(" | Set isAboutToCollect to true"));

      return c.json({ success: true });
    }
  )
  .post(
    "/:id/collect/test-unlock",
    zValidator(
      "param",
      z.object({
        id: z.coerce.number(),
      })
    ),
    zValidator(
      "json",
      z.object({
        code: z.string(),
      })
    ),
    async (c) => {
      // This is what would run on the client
      await new Promise((r) => setTimeout(r, 500));
      const { id } = c.req.valid("param");
      const { code } = c.req.valid("json");

      const orderCollection = await db.query.orderCollections.findFirst({
        where: eq(db.orderCollections.orderId, id),
      });
      if (!orderCollection) return c.text("Not found", 404);

      const codeHash = await sha256(code);
      if (codeHash !== orderCollection.codeHash) {
        return c.text("Invalid code", 400);
      }
      if (
        !orderCollection.codeHashExpiresAt ||
        isAfter(new Date(), orderCollection.codeHashExpiresAt)
      ) {
        return c.text("Code expired", 400);
      }

      await db
        .delete(db.orderCollections)
        .where(eq(db.orderCollections.orderId, id));
      await db
        .update(db.orders)
        .set({ status: "collected", collectedAt: new Date() })
        .where(eq(db.orders.id, id));

      console.log("");
      console.log(
        chalk.bold.yellow(`Test unlocking #${orderCollection.orderId}`)
      );
      console.log(chalk.gray(` | Code: ${code}`));
      console.log(chalk.gray(` | Code hash: ${codeHash}`));
      console.log(chalk.gray(` | Saved hash: ${orderCollection.codeHash}`));
      console.log(chalk.green(" ✓ Matches"));
      console.log(chalk.gray(` | Collected at: ${new Date().toDateString()}`));

      setTimeout(async () => {
        // revert updates to order
        await db
          .update(db.orders)
          .set({ status: "ready", collectedAt: null })
          .where(eq(db.orders.id, id));
        console.log(chalk.gray(` | Order status reverted to ready`));
      }, 2000);

      return c.json({ success: true });
    }
  );
