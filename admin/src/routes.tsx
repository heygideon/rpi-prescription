import { Route, Routes } from "react-router";

import AppLayout from "./routes/_layout";
import Home from "./routes/home";

import OrdersHome from "./routes/orders/home";
import OrderLayout from "./routes/orders/order/_layout";
import OrderHome from "./routes/orders/order/home";

import UsersHome from "./routes/users/home";
import UserLayout from "./routes/users/user/_layout";
import UserOrders from "./routes/users/user/orders";
import UserPrescriptions from "./routes/users/user/prescriptions";
import UserAbout from "./routes/users/user/about";

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
      <Route path="orders/:id" element={<OrderLayout />}>
        <Route index element={<OrderHome />} />
      </Route>
      <Route path="users" element={<UsersHome />} />
      <Route path="users/:id" element={<UserLayout />}>
        <Route index element={<UserOrders />} />
        <Route path="prescriptions" element={<UserPrescriptions />} />
        <Route path="about" element={<UserAbout />} />
      </Route>
      <Route path="lockers" element={<LockersHome />} />
      <Route path="counter" element={<CounterHome />} />
      <Route path="counter/user/:userId" element={<CounterUserLayout />}>
        <Route index element={<CounterUserHome />} />
        <Route path="order/:orderId" element={<CounterUserOrder />} />
      </Route>
    </Route>
  </Routes>
);
