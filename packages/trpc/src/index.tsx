import type { AppRouter } from "@repo/api";
import {
  createTRPCQueryUtils,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import type Auth from "@repo/auth";
import type { QueryClient } from "@tanstack/react-query";

export const trpc = createTRPCReact<AppRouter>();
export function createClient(
  url: "http://localhost:3000/trpc" | (string & {}),
  opts: { auth?: Auth } = {}
) {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url,
        async headers() {
          if (opts.auth) {
            const token = await opts.auth.getAccessToken();
            if (token) {
              return {
                Authorization: `Bearer ${token}`,
              };
            }
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
