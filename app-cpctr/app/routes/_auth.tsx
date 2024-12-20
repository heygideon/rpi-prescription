import { trpcUtils } from "@/lib/trpc";
import { Outlet, redirect } from "react-router";

export default function AuthLayout() {
  return <Outlet />;
}

export async function clientLoader() {
  try {
    await trpcUtils.auth.me.ensureData();
  } catch (e) {
    throw redirect("/auth");
  }
}
