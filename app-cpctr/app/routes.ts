import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/home/_layout.tsx", [
    index("routes/home/home.tsx"),
    route("order", "routes/home/order.tsx"),
    route("account", "routes/home/account.tsx"),
  ]),
  route("prescription/:id", "routes/prescription/view.tsx"),
] satisfies RouteConfig;
