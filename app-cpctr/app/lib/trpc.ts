import { QueryClient } from "@tanstack/react-query";
import {
  createTRPCClient,
  createTRPCQueryUtils,
  createTRPCReact,
  httpBatchLink,
  httpLink,
} from "@trpc/react-query";
import type { AppRouter } from "api/trpc";
import dayjs from "dayjs";

const tokens = {
  get accessToken() {
    return sessionStorage.getItem("access_token");
  },
  set accessToken(value) {
    if (value) {
      sessionStorage.setItem("access_token", value);
    } else {
      sessionStorage.removeItem("access_token");
    }
  },
  get refreshToken() {
    return localStorage.getItem("refresh_token");
  },
  set refreshToken(value) {
    if (value) {
      localStorage.setItem("refresh_token", value);
    } else {
      localStorage.removeItem("refresh_token");
    }
  },
};

const _refreshClient = createTRPCClient<AppRouter>({
  links: [
    httpLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
async function refreshTokens() {
  if (!tokens.refreshToken) return;
  try {
    const { accessToken, refreshToken } =
      await _refreshClient.auth.refresh.mutate({
        refreshToken: tokens.refreshToken,
      });
    tokens.accessToken = accessToken;
    tokens.refreshToken = refreshToken;
  } catch (e) {
    console.error(e);
    tokens.accessToken = null;
    tokens.refreshToken = null;
  }
}

export const trpc = createTRPCReact<AppRouter>();
export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      async headers() {
        if (tokens.refreshToken) {
          if (tokens.accessToken) {
            const payload = tokens.accessToken.split(".")[1];
            const { exp } = JSON.parse(atob(payload));
            const expDate = dayjs.unix(exp);

            if (expDate.subtract(30, "seconds").isBefore(dayjs())) {
              await refreshTokens();
            }
          } else {
            await refreshTokens();
          }
        }

        if (!tokens.accessToken) return {};
        return {
          Authorization: `Bearer ${tokens.accessToken}`,
        };
      },
    }),
  ],
});
export const queryClient = new QueryClient();

export const trpcUtils = createTRPCQueryUtils<AppRouter>({
  client,
  queryClient,
});
