import {
  type RouteConfig,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("counter", [index("routes/counter/home.tsx")]),
  ]),
] satisfies RouteConfig;
