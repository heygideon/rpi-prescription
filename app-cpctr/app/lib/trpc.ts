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
      let accessToken = localStorage.getItem("access_token");
      let refreshToken = localStorage.getItem("refresh_token");

      if (accessToken && refreshToken) {
        const payload = accessToken.split(".")[1];
        const { exp } = JSON.parse(atob(payload));

        if (exp < Date.now() / 1000) {
          const response = await fetch("http://localhost:3000/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            await response.json();
          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", newRefreshToken);
          accessToken = newAccessToken;
        }
      }
      if (!accessToken) return {};

      return {
        Authorization: `Bearer ${accessToken}`,
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
