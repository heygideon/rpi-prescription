import { Navigate, useNavigate } from "react-router";
import { trpc } from "@repo/trpc";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { SignOut } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/lib/auth";
import { useIntersection } from "@mantine/hooks";
import clsx from "clsx";

dayjs.extend(relativeTime);

export default function Home() {
  const queryUtils = trpc.useUtils();
  const navigate = useNavigate();
  const {
    data: user,
    error,
    isPending,
  } = trpc.auth.me.useQuery(undefined, {
    // retry: (_, e) => e.data?.code !== "UNAUTHORIZED",
    retry: false,
  });
  const logout = useMutation({
    mutationFn: () => auth.logout(),
    onSuccess: async () => {
      await queryUtils.auth.me.invalidate();
      await navigate("/auth");
    },
  });

  const { ref, entry } = useIntersection({
    threshold: 1,
  });
  const showHeader = entry ? !entry?.isIntersecting : false;

  if (isPending)
    return (
      <div className="p-6">
        <div className="mx-auto size-20 animate-pulse rounded-full bg-gray-300"></div>
        <div className="mx-auto mt-2.5 h-9 w-44 rounded bg-gray-300"></div>
        <div className="mx-auto mt-2.5 h-5 w-32 rounded bg-gray-300"></div>
      </div>
    );
  if (error) return <Navigate to="/auth" />;

  return (
    <>
      <div
        className={clsx(
          "fixed inset-x-0 -top-2 z-10 border-b border-gray-200 bg-white pt-2 shadow-md transition",
          !showHeader && "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <div className="h-safe-area-t"></div>
        <div className="flex h-14 items-center px-6">
          <div className="mr-2 grid size-6 place-items-center rounded-full bg-cyan-700 text-white shadow">
            <span className="text-xs font-medium leading-none">
              {user.firstName.charAt(0).toUpperCase() +
                user.lastName.charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="text-xl font-bold tracking-tight">Account</p>
        </div>
      </div>
      <div className="-mb-6 bg-white p-6 pb-12 text-center">
        <div className="relative">
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
          <div ref={ref} className="absolute inset-x-0 bottom-14"></div>
        </div>
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
      <div className="relative isolate overflow-clip rounded-t-xl border-t border-gray-200 bg-gray-100 p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold tracking-tight">
              Nominated pharmacy
            </h2>
            <div className="mt-3 rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
              <h3 className="text-lg font-bold tracking-tight">
                Cohens Chemist
              </h3>
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
            <h2 className="text-xl font-bold tracking-tight">
              Your GP practice
            </h2>
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
          {/* TODO: move to settings drawer */}
          <div>
            <button
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className="-m-2 mx-auto flex items-center gap-2 p-2 text-red-700 transition active:scale-95 active:text-red-900 disabled:scale-100 disabled:text-gray-400"
            >
              <SignOut weight="bold" className="size-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
