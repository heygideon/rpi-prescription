import { trpc } from "@repo/trpc";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const { data, isPending } = trpc.auth.me.useQuery(undefined, {
    retry: false,
  });

  if (isPending)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <span className="size-5 animate-spin rounded-full border border-transparent border-r-gray-500"></span>
      </div>
    );
  if (!data) return <Navigate to="/auth" />;

  return <Outlet />;
}
