import { Route, Routes } from "react-router";

import AppLayout from "./routes/_layout";
import Home from "./routes/home";
import OrdersHome from "./routes/orders/home";
import UsersHome from "./routes/users/home";
import LockersHome from "./routes/lockers/home";
import CounterHome from "./routes/counter/home";

import CounterUserLayout from "./routes/counter/user/_layout";
import CounterUserHome from "./routes/counter/user/home";
import CounterUserOrder from "./routes/counter/user/order";

export const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="orders" element={<OrdersHome />} />
      <Route path="users" element={<UsersHome />} />
      <Route path="lockers" element={<LockersHome />} />
      <Route path="counter" element={<CounterHome />} />
      <Route path="counter/user/:userId" element={<CounterUserLayout />}>
        <Route index element={<CounterUserHome />} />
        <Route path="order/:orderId" element={<CounterUserOrder />} />
      </Route>
    </Route>
  </Routes>
);
