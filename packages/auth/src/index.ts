import { hc, type InferRequestType } from "hono/client";
import type { AuthRoute } from "@repo/api";
import { fromUnixTime, isAfter, subSeconds } from "date-fns";

function createAuthClient(url: string) {
  return hc<AuthRoute>(url);
}
type AuthClient = ReturnType<typeof createAuthClient>;

class TokenStorage {
  get accessToken() {
    return localStorage.getItem("accessToken");
  }
  set accessToken(value: string | null) {
    if (value === null) {
      localStorage.removeItem("accessToken");
    } else {
      localStorage.setItem("accessToken", value);
    }
  }
  get refreshToken() {
    return localStorage.getItem("refreshToken");
  }
  set refreshToken(value: string | null) {
    if (value === null) {
      localStorage.removeItem("refreshToken");
    } else {
      localStorage.setItem("refreshToken", value);
    }
  }
}

class Auth {
  private tokens: TokenStorage;
  private client: AuthClient;

  constructor(url: string, tokenStorage?: TokenStorage) {
    this.client = createAuthClient(url);
    this.tokens = tokenStorage ?? new TokenStorage();
  }

  async login(json: InferRequestType<typeof this.client.login.$post>["json"]) {
    const res = await this.client.login.$post({ json });
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return await res.json();
  }
  async verify(
    json: InferRequestType<typeof this.client.verify.$post>["json"]
  ) {
    const res = await this.client.verify.$post({ json });
    if (!res.ok) {
      throw new Error(await res.text());
    }

    const tokens = await res.json();
    this.tokens.accessToken = tokens.accessToken;
    this.tokens.refreshToken = tokens.refreshToken;

    return { success: true };
  }
  async refresh() {
    const refreshToken = this.tokens.refreshToken;
    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const res = await this.client.refresh.$post({
      json: { refreshToken },
    });
    if (!res.ok) {
      throw new Error(await res.text());
    }

    const tokens = await res.json();
    this.tokens.accessToken = tokens.accessToken;
    this.tokens.refreshToken = tokens.refreshToken;

    return { success: true };
  }

  private shouldRefreshTokens() {
    const accessToken = this.tokens.accessToken;
    if (!accessToken) {
      return true;
    }

    const [, payload] = accessToken.split(".");
    const { exp } = JSON.parse(atob(payload)) as { exp: number };
    const expDate = fromUnixTime(exp);

    // refresh 30 secs before expiration
    if (isAfter(new Date(), subSeconds(expDate, 30))) {
      return true;
    }
  }
  async getAccessToken() {
    if (!this.tokens.accessToken || !this.tokens.refreshToken) {
      throw new Error("Not logged in");
    }

    if (this.shouldRefreshTokens()) {
      await this.refresh();
    }

    return this.tokens.accessToken;
  }
}
export default Auth;
