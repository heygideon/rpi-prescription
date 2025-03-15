import Auth from "@repo/auth";

export const getApiUrl = () => {
  try {
    return import.meta.env.PUBLIC_RENDER_API_URL || "http://localhost:3000";
  } catch (e) {
    // PUBLIC_RENDER_API_URL is not defined
    return "http://localhost:3000";
  }
};

export const auth = new Auth(`${getApiUrl()}/auth`);
