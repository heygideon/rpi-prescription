import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("orders", [index("routes/orders/home.tsx")]),
    ...prefix("users", [index("routes/users/home.tsx")]),
    ...prefix("lockers", [index("routes/lockers/home.tsx")]),
    ...prefix("counter", [
      index("routes/counter/home.tsx"),
      layout("routes/counter/user/_layout.tsx", [
        route("user/:userId", "routes/counter/user/home.tsx"),
        route("user/:userId/order/:orderId", "routes/counter/user/order.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
