import { client } from "@/lib/trpc";
import { Outlet, redirect } from "react-router";

export default function AuthLayout() {
  return <Outlet />;
}

export async function clientLoader() {
  let data;
  try {
    data = await client.auth.me.query();
  } catch (e) {
    throw redirect("/auth");
  }

  const { session } = data;
  if (!session.verified) {
    throw redirect("/auth/2fa");
  }
}
