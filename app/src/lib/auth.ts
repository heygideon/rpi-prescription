import Auth from "@repo/auth";

export const getApiUrl = () => {
  try {
    return import.meta.env.VITE_RENDER_API_URL || "http://localhost:3000";
  } catch (e) {
    return "http://localhost:3000";
  }
};

export const auth = new Auth(`${getApiUrl()}/auth`);
