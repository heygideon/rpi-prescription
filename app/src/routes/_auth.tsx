import { trpc } from "@repo/trpc";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const { data, isPending } = trpc.auth.me.useQuery();

  if (isPending) return null;
  if (!data) return <Navigate to="/auth" />;

  return <Outlet />;
}
