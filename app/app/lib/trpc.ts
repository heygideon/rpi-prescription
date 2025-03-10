import { QueryClient } from "@tanstack/react-query";
import { createClient, createQueryUtils } from "@repo/trpc";
import { auth, getApiUrl } from "./auth";

export const client = createClient(`${getApiUrl()}/trpc`, { auth });
export const queryClient = new QueryClient();

export const trpcUtils = createQueryUtils({
  client,
  queryClient,
});
