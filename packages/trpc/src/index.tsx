import type { AppRouter } from "@repo/api";
import {
  createTRPCQueryUtils,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import type Auth from "@repo/auth";
import type { QueryClient } from "@tanstack/react-query";

export const trpc = createTRPCReact<AppRouter>();
export function createClient(url: string, opts: { auth: Auth }) {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url,
        async headers() {
          if (opts.auth) {
            return {
              Authorization: `Bearer ${await opts.auth.getAccessToken()}`,
            };
          }
          return {};
        },
      }),
    ],
  });
}

export const Provider = trpc.Provider;
export function createQueryUtils(opts: {
  client: ReturnType<typeof createClient>;
  queryClient: QueryClient;
}) {
  return createTRPCQueryUtils<AppRouter>(opts);
}
