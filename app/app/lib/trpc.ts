import { QueryClient } from "@tanstack/react-query";
import { createClient, createQueryUtils } from "@repo/trpc";
import { auth } from "./auth";

export const client = createClient("http://localhost:3000/trpc", { auth });
export const queryClient = new QueryClient();

export const trpcUtils = createQueryUtils({
  client,
  queryClient,
});
