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
    // async headers() {
    //   return {
    //     authorization: getAuthCookie(),
    //   };
    // },
  }),
] satisfies TRPCLink<AppRouter>[];

export const trpc = createTRPCReact<AppRouter>();
export const client = createTRPCClient<AppRouter>({
  links: trpcLinks,
});
export const reactClient = trpc.createClient({
  links: trpcLinks,
});
