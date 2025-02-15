import { QueryClient } from "@tanstack/react-query";
import { createClient, createQueryUtils } from "@repo/trpc";

export const client = createClient("http://localhost:3000/trpc");
export const queryClient = new QueryClient();

export const trpcUtils = createQueryUtils({
  client,
  queryClient,
});
