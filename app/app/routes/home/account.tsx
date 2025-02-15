import { Navigate } from "react-router";
import { trpc } from "@repo/trpc";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Home() {
  const { data, error, isPending } = trpc.auth.me.useQuery(undefined, {
    // retry: (_, e) => e.data?.code !== "UNAUTHORIZED",
    retry: false,
  });

  if (isPending)
    return (
      <div className="p-6">
        <div className="mx-auto size-20 animate-pulse rounded-full bg-gray-300"></div>
        <div className="mx-auto mt-2.5 h-9 w-44 rounded bg-gray-300"></div>
        <div className="mx-auto mt-2.5 h-5 w-32 rounded bg-gray-300"></div>
      </div>
    );
  if (error) return <Navigate to="/auth" />;

  const { user } = data;

  return (
    <>
      <div className="p-6 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-cyan-700 text-white shadow">
          <span className="text-3xl font-medium leading-none">
            {user.firstName.charAt(0).toUpperCase() +
              user.lastName.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="mt-2 text-4xl font-bold tracking-tight">
          {user.firstName} {user.lastName}
        </h2>
        <p className="mt-1 text-gray-600">
          Joined {dayjs(user.createdAt).fromNow()}
        </p>
        <div className="mt-4 flex gap-3">
          <div className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white py-4 text-center">
            <p className="text-2xl font-semibold">5</p>
            <p className="text-sm text-gray-600">prescriptions collected</p>
          </div>
          <div className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white py-4 text-center">
            <p className="text-2xl font-semibold">50min</p>
            <p className="text-sm text-gray-600">time saved</p>
          </div>
        </div>
      </div>
      <div className="mx-6 border-b border-dashed border-gray-400"></div>
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
              If you've moved, contact your new GP to change.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
