import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
  type TRPCLink,
} from "@trpc/react-query";
import type { AppRouter } from "api/trpc";

const trpcLinks = [
  httpBatchLink({
    url: "http://localhost:3000/trpc",
    // You can pass any HTTP headers you wish here
    async headers() {
      const token = localStorage.getItem("access_token");
      // TODO: refresh token if expired
      if (!token) return {};

      return {
        Authorization: `Bearer ${token}`,
      };
    },
  }),
] satisfies TRPCLink<AppRouter>[];

export const trpc = createTRPCReact<AppRouter>();
export const client = createTRPCClient<AppRouter>({
  links: trpcLinks,
});
export const reactClient = trpc.createClient({
  links: trpcLinks,
});
