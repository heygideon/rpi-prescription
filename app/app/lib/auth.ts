import Auth from "@repo/auth";

export const getApiUrl = () => {
  return import.meta.env.RENDER_API_URL || "http://localhost:3000";
};

export const auth = new Auth(`${getApiUrl()}/auth`);
