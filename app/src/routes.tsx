import { Route, Routes } from "react-router";

import AuthLayout from "./routes/_auth";
import HomeLayout from "./routes/home/_layout";
import Home from "./routes/home/home";
import Order from "./routes/home/order";
import Account from "./routes/home/account";
import PrescriptionView from "./routes/prescription/view";

import AuthHome from "./routes/auth/home";
import AuthLogin from "./routes/auth/login";
import AuthSignup from "./routes/auth/signup";
import AuthFinish from "./routes/auth/finish";

export const AppRoutes = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="account" element={<Account />} />
      </Route>
      <Route path="prescription/:id" element={<PrescriptionView />} />
    </Route>
    <Route path="auth" element={<AuthHome />} />
    <Route path="auth/login" element={<AuthLogin />} />
    <Route path="auth/signup" element={<AuthSignup />} />
    <Route path="auth/finish" element={<AuthFinish />} />
  </Routes>
);
