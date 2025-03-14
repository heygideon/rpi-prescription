import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

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
    return c.json({ success: true, data: { id, code }, message: "Hi :)" });
  }
);
