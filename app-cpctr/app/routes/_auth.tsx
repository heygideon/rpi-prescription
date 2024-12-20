import { client } from "@/lib/trpc";
import { Outlet, redirect } from "react-router";

export default function AuthLayout() {
  return <Outlet />;
}

export async function clientLoader() {
  try {
    await client.auth.me.query();
  } catch (e) {
    throw redirect("/auth");
  }
}
