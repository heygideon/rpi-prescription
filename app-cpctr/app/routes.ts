import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("routes/home/_layout.tsx", [index("routes/home/home.tsx")]),
] satisfies RouteConfig;
