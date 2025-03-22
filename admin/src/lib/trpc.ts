import { QueryClient } from "@tanstack/react-query";
import { createClient, createQueryUtils } from "@repo/trpc";

const getApiUrl = () => {
  try {
    return import.meta.env.PUBLIC_RENDER_API_URL || "http://localhost:3000";
  } catch (e) {
    // PUBLIC_RENDER_API_URL is not defined
    return "http://localhost:3000";
  }
};

export const client = createClient(`${getApiUrl()}/trpc`);
export const queryClient = new QueryClient();

export const trpcUtils = createQueryUtils({
  client,
  queryClient,
});
