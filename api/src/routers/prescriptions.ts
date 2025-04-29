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
      await new Promise((r) => setTimeout(r, 500));
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
      await new Promise((r) => setTimeout(r, 500));
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
    await new Promise((r) => setTimeout(r, 500));
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
        await new Promise((r) => setTimeout(r, 500));
        const { id, postcodeHalf } = input;

        const order = await db.query.orders.findFirst({
          where: eq(db.orders.id, id),
        });
        if (!order) throw new TRPCError({ code: "NOT_FOUND" });
        if (order.status !== "ready")
          throw new TRPCError({ code: "FORBIDDEN" });

        if (!/[0-9]{1}[A-Z]{2}/.test(postcodeHalf)) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        // TODO: verify postcode half with user

        const code = createCollectCode();
        const codeHash = await sha256(code);
        const expiresAt = addHours(new Date(), 1);

        // TODO: if order collection item does not exist, return 404
        // to wait for a locker to be assigned

        await db
          .insert(db.orderCollections)
          .values({
            orderId: id,
            codeHash,
            expiresAt,
            collectedBy: ctx.user.id,
            // isAboutToCollect: false,
          })
          .onConflictDoUpdate({
            target: [db.orderCollections.orderId],
            set: {
              codeHash,
              expiresAt,
              collectedBy: ctx.user.id,
              // isAboutToCollect: false,
            },
          });

        console.log("");
        console.log(chalk.bold.yellow(`Generated code for #${id}`));
        console.log(chalk.gray(` | code: ${code}`));
        console.log(chalk.gray(` | codeHash: ${codeHash}`));
        console.log("");

        return { code };
      }),

    // beforeUnlock: authProcedure
    // .input(
    //   z.object({
    //     id: z.coerce.number(),
    //   })
    // )
    // .mutation(async ({ input }) => {
    //   await new Promise((r) => setTimeout(r, 500));
    //   const orderCollection = await db.query.orderCollections.findFirst({
    //     where: eq(db.orderCollections.orderId, input.id),
    //   });
    //   if (!orderCollection) throw new TRPCError({ code: "NOT_FOUND" });

    //   await db
    //     .update(db.orderCollections)
    //     .set({ isAboutToCollect: true })
    //     .where(eq(db.orderCollections.orderId, input.id));

    //   console.log("");
    //   console.log(
    //     chalk.bold.yellow(`About to unlock #${orderCollection.orderId}`)
    //   );
    //   console.log(chalk.gray(" | Set isAboutToCollect to true"));
    //   console.log("");

    //   return { success: true };
    // }),

    testUnlock: authProcedure
      .input(
        z.object({
          id: z.coerce.number(),
          code: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // This is what would run on the client
        await new Promise((r) => setTimeout(r, 500));
        const { id, code } = input;

        const orderCollection = await db.query.orderCollections.findFirst({
          where: eq(db.orderCollections.orderId, id),
        });
        if (!orderCollection) throw new TRPCError({ code: "NOT_FOUND" });

        const codeHash = await sha256(code);
        if (codeHash !== orderCollection.codeHash) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }
        if (
          !orderCollection.expiresAt ||
          isAfter(new Date(), orderCollection.expiresAt)
        ) {
          throw new TRPCError({ code: "BAD_REQUEST" });
        }

        const collectedAt = new Date();

        await db
          .delete(db.orderCollections)
          .where(eq(db.orderCollections.orderId, id));
        await db
          .update(db.orders)
          .set({
            status: "collected",
            //  collectedAt: new Date()
          })
          .where(eq(db.orders.id, id));

        console.log("");
        console.log(
          chalk.bold.yellow(`Test unlocking #${orderCollection.orderId}`)
        );
        console.log(chalk.gray(` | code: ${code}`));
        console.log(chalk.gray(` | codeHash: ${codeHash}`));
        console.log(chalk.gray(` | savedHash: ${orderCollection.codeHash}`));
        console.log(chalk.green(" ✓ matches"));
        console.log(
          chalk.gray(
            ` | collectedAt: ${format(collectedAt, "yyyy-MM-dd HH:mm:ss")}`
          )
        );
        console.log("");

        setTimeout(async () => {
          // revert updates to order
          await db
            .update(db.orders)
            .set({
              status: "ready",
              // collectedAt: null
            })
            .where(eq(db.orders.id, id));
          console.log("");
          console.log(chalk.gray(` | order status reverted to ready`));
          console.log("");
        }, 2000);

        return { success: true };
      }),
  },
});
export default prescriptionsRouter;
