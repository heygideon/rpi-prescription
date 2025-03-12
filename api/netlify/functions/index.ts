import type { Config, Context } from "@netlify/functions";
import { app } from "../../src/app";

export default async (req: Request, _context: Context) => {
  return app.fetch(req);
};

export const config: Config = {
  path: "/*",
};
