import db from "../db";
import { orderStatusEnum } from "../db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { init } from "@paralleldrive/cuid2";
import sha256 from "../lib/sha256";
import chalk from "chalk";
import { addHours, format, isAfter } from "date-fns";
import { authProcedure, router } from "../lib/trpc";
import { TRPCError } from "@trpc/server";

const createCollectCode = init({
  length: 32,
});

const prescriptionsRouter = router({
  getAll: authProcedure
    .input(
      z.object({
        status: z
          .enum(orderStatusEnum.enumValues)
          .array()
          .default([...orderStatusEnum.enumValues]),
      })
    )
    .query(async ({ ctx, input }) => {
      const rows = await db.query.orders.findMany({
        with: {
          user: {
            columns: { title: true, firstName: true, lastName: true },
          },
        },
        where: and(
          eq(db.orders.userId, ctx.user.id),
          inArray(db.orders.status, input.status)
        ),
      });

      return rows.toSorted(
        (a, b) =>
          orderStatusEnum.enumValues.indexOf(b.status) -
          orderStatusEnum.enumValues.indexOf(a.status)
      );
    }),

  getOne: authProcedure
    .input(
      z.object({
        id: z.coerce.number(),
      })
    )
    .query(async ({ input }) => {
      const row = await db.query.orders.findFirst({
        where: eq(db.orders.id, input.id),
        with: {
          user: {
            columns: { title: true, firstName: true, lastName: true },
          },
        },
      });
      if (!row) throw new TRPCError({ code: "NOT_FOUND" });

      return row;
    }),

  new: authProcedure.mutation(async ({ ctx }) => {
    const [row] = await db
      .insert(db.orders)
      .values({
        userId: ctx.user.id,
        status: "preparing",
      })
      .returning();

    return { success: true, order: row };
  }),

  collect: {
    generateCode: authProcedure
      .input(
        z.object({
          id: z.coerce.number(),
          postcodeHalf: z.string().toUpperCase(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const { id, postcodeHalf } = input;

        const order = await db.query.orders.findFirst({
          where: eq(db.orders.id, id),
        });
        const orderCollection = await db.query.orderCollections.findFirst({
          where: eq(db.orderCollections.orderId, id),
        });

        if (!order) throw new TRPCError({ code: "NOT_FOUND" });
        if (!orderCollection || order.status !== "ready")
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Order not ready yet",
          });

        if (!/[0-9]{1}[A-Z]{2}/.test(postcodeHalf)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid postcode half",
          });
        }

        // TODO: verify postcode half with user

        const code = createCollectCode();
        const codeHash = await sha256(code);
        const expiresAt = addHours(new Date(), 1);

        await db
          .update(db.orderCollections)
          .set({
            codeHash,
            expiresAt,
            collectedBy: ctx.user.id,
          })
          .where(eq(db.orderCollections.orderId, id));

        console.log("");
        console.log(chalk.bold.yellow(`Generated code for #${id}`));
        console.log(chalk.gray(` | code: ${code}`));
        console.log(chalk.gray(` | codeHash: ${codeHash}`));
        console.log("");

        return { code };
      }),
  },
});
export default prescriptionsRouter;
