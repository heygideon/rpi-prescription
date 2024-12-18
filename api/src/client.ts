import { hc } from "hono/client";
import type { App } from ".";

import type { Schema } from "./db";

const client = hc<App>("http://localhost:3000");
export default client;

export const getAccessToken = async () => {
  let token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }

  const [, payload] = token.split(".");
  const decoded = JSON.parse(atob(payload));
  if (decoded.exp * 1000 < Date.now()) {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    // TODO: refresh token
  }

  return token;
};

export type Table<
  K extends keyof Schema,
  V extends "select" | "insert" = "select",
> = Schema[K][`$infer${Capitalize<V>}`];
