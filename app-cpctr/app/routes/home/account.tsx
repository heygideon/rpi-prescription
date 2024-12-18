import client, { getAccessToken } from "api";
import { redirect } from "react-router";
import type { Route } from "./+types/account";

export default function Home({ loaderData }: Route.ComponentProps) {
  if (!loaderData) return null;

  const { user } = loaderData;
  return (
    <>
      <div className="sticky top-0 bg-white p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="grid size-16 place-items-center rounded-full bg-cyan-700 text-white shadow">
            <span className="text-2xl font-medium leading-none">GS</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h2>
            <p className="mt-0.5 text-gray-600">Joined 4 months ago</p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <div className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 py-4 text-center">
            <p className="text-2xl font-semibold">5</p>
            <p className="text-sm text-gray-600">prescriptions collected</p>
          </div>
          <div className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 py-4 text-center">
            <p className="text-2xl font-semibold">50min</p>
            <p className="text-sm text-gray-600">time saved</p>
          </div>
        </div>
      </div>
      <div className="space-y-6 p-6">
        <section>
          <h2 className="text-xl font-bold tracking-tight">
            Nominated pharmacy
          </h2>
          <div className="mt-3 rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
            <h3 className="text-lg font-bold tracking-tight">Cohens Chemist</h3>
            <p className="truncate text-sm text-gray-600">
              4 Privet Drive, Little Whinging, Surrey GU1 3SX
            </p>
            <div className="mt-1.5 space-y-1">
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Monday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Tuesday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Wednesday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Thursday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Friday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Saturday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 1pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Sunday</p>
                <p className="min-w-0 flex-1 text-gray-600">Closed</p>
              </div>
            </div>
            <p className="mt-1.5 text-xs italic text-gray-600">
              To change pharmacies, contact your GP.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold tracking-tight">Your GP practice</h2>
          <div className="mt-3 rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
            <h3 className="text-lg font-bold tracking-tight">
              Milky Way Medical Centre
            </h3>
            <p className="truncate text-sm text-gray-600">
              5 Milky Way, Little Whinging, Surrey GU1 3SX
            </p>
            <div className="mt-1.5 space-y-1">
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Monday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Tuesday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Wednesday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Thursday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Friday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 6pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Saturday</p>
                <p className="min-w-0 flex-1 text-gray-600">9am - 1pm</p>
              </div>
              <div className="flex gap-2 text-sm text-gray-600">
                <p className="w-20">Sunday</p>
                <p className="min-w-0 flex-1 text-gray-600">Closed</p>
              </div>
            </div>
            <p className="mt-1.5 text-xs italic text-gray-600">
              If you’ve moved, contact your new GP to change.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export async function clientLoader() {
  try {
    const token = await getAccessToken();
    console.log(token);
    const res = await client.auth.me.$get(
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  } catch (e) {
    throw redirect("/auth");
  }
}
