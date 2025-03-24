import { trpc } from "@repo/trpc";
import clsx from "clsx";
import { NavLink, Outlet, useParams } from "react-router";

export default function UserLayout() {
  const params = useParams<{ id: string }>();
  const { data: user, isPending } = trpc.admin.users.getOne.useQuery({
    id: parseInt(params.id!),
  });

  if (isPending)
    return (
      <div className="mx-auto flex max-w-6xl gap-4 p-8">
        <div className="grid size-16 animate-pulse place-items-center rounded-full bg-gray-300"></div>
        <div className="flex flex-col justify-center">
          <div className="h-7 w-40 animate-pulse rounded bg-gray-300"></div>
          <div className="mt-1.5 h-5 w-32 animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
    );

  if (!user) return null;

  return (
    <>
      <div className="border-b border-gray-300 pt-8">
        <div className="mx-auto flex max-w-6xl gap-4 px-8">
          <div className="grid size-16 place-items-center rounded-full bg-cyan-700 text-white shadow">
            <span className="text-2xl font-medium leading-none">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold tracking-tight">
              {user.title} {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600">4 Privet Drive</p>
          </div>
        </div>
        <div className="mx-auto -mb-0.5 mt-6 flex max-w-6xl px-5">
          <NavLink to={`/users/${params.id}`} end className="group px-3">
            {({ isActive }) => (
              <div
                className={clsx(
                  "flex items-center gap-1.5 border-b-[3px] py-1.5",
                  isActive
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-600 group-hover:border-gray-300",
                )}
              >
                <span className="text-lg font-medium">Orders</span>
              </div>
            )}
          </NavLink>
          <NavLink
            to={`/users/${params.id}/prescriptions`}
            className="group px-3"
          >
            {({ isActive }) => (
              <div
                className={clsx(
                  "flex items-center gap-1.5 border-b-[3px] py-1.5",
                  isActive
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-600 group-hover:border-gray-300",
                )}
              >
                <span className="text-lg font-medium">Prescriptions</span>
              </div>
            )}
          </NavLink>
          <NavLink to={`/users/${params.id}/about`} className="group px-3">
            {({ isActive }) => (
              <div
                className={clsx(
                  "flex items-center gap-1.5 border-b-[3px] py-1.5",
                  isActive
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-gray-600 group-hover:border-gray-300",
                )}
              >
                <span className="text-lg font-medium">About</span>
              </div>
            )}
          </NavLink>
        </div>
      </div>
      <div className="mx-auto max-w-6xl">
        <Outlet />
      </div>
    </>
  );
}
