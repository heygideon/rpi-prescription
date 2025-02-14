import {
  ArrowLeft,
  Basket,
  CaretDown,
  CaretUp,
  ClipboardText,
  Door,
  House,
  Users,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { Link, NavLink, Outlet, useMatch, useNavigate } from "react-router";

export default function AppLayout() {
  const match = useMatch({
    path: "/counter",
    end: false,
  });
  const navigate = useNavigate();

  return (
    <div className="flex h-full gap-2 bg-gray-100 p-2">
      <div
        style={{
          marginLeft: match ? "-16.5rem" : 0,
        }}
        className="flex w-64 flex-none flex-col p-4 transition-all"
      >
        <div className="-m-2 flex items-center gap-2 rounded-md p-2 transition hover:bg-gray-300">
          <div className="size-8 flex-none rounded bg-gradient-to-tr from-blue-900 to-pink-500"></div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium leading-tight">
              Cohens Chemist
            </h4>
            <p className="mt-px text-xs leading-tight text-gray-600">
              4 Privet Drive
            </p>
          </div>
          <CaretDown weight="bold" className="size-4 text-gray-500" />
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="flex flex-1 flex-col gap-y-4">
          <NavLink to="/" end className="relative flex items-center gap-1.5">
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute -left-6 top-1 h-4 w-[3px] rounded-r-full bg-emerald-700"></div>
                )}
                <House
                  weight={isActive ? "fill" : "bold"}
                  className={clsx(
                    "size-5",
                    isActive ? "text-emerald-700" : "text-gray-500",
                  )}
                />
                <span
                  className={clsx(
                    isActive
                      ? "font-semibold text-emerald-700"
                      : "font-medium text-gray-600",
                  )}
                >
                  Home
                </span>
              </>
            )}
          </NavLink>

          <NavLink to="/orders" className="relative flex items-center gap-1.5">
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute -left-6 top-1 h-4 w-[3px] rounded-r-full bg-emerald-700"></div>
                )}
                <ClipboardText
                  weight={isActive ? "fill" : "bold"}
                  className={clsx(
                    "size-5",
                    isActive ? "text-emerald-700" : "text-gray-500",
                  )}
                />
                <span
                  className={clsx(
                    isActive
                      ? "font-semibold text-emerald-700"
                      : "font-medium text-gray-600",
                  )}
                >
                  Orders
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/users" className="relative flex items-center gap-1.5">
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute -left-6 top-1 h-4 w-[3px] rounded-r-full bg-emerald-700"></div>
                )}
                <Users
                  weight={isActive ? "fill" : "bold"}
                  className={clsx(
                    "size-5",
                    isActive ? "text-emerald-700" : "text-gray-500",
                  )}
                />
                <span
                  className={clsx(
                    isActive
                      ? "font-semibold text-emerald-700"
                      : "font-medium text-gray-600",
                  )}
                >
                  Users
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/lockers" className="relative flex items-center gap-1.5">
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute -left-6 top-1 h-4 w-[3px] rounded-r-full bg-emerald-700"></div>
                )}
                <Door
                  weight={isActive ? "fill" : "bold"}
                  className={clsx(
                    "size-5",
                    isActive ? "text-emerald-700" : "text-gray-500",
                  )}
                />
                <span
                  className={clsx(
                    isActive
                      ? "font-semibold text-emerald-700"
                      : "font-medium text-gray-600",
                  )}
                >
                  Lockers
                </span>
              </>
            )}
          </NavLink>
          <div className="min-h-0 flex-1"></div>
          <Link to="/counter" className="flex items-center gap-1.5">
            <Basket weight="bold" className="size-5 text-gray-500" />
            <span className="font-medium text-gray-600">In-store counter</span>
          </Link>
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="-m-2 flex items-center gap-2 rounded-md p-2 transition hover:bg-gray-300">
          <div className="size-8 flex-none rounded-full bg-gradient-to-br from-red-600 to-amber-600"></div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium leading-tight">Jane Doe</h4>
            <p className="mt-px text-xs leading-tight text-gray-600">
              jane@cohens.pharmacy
            </p>
          </div>
          <CaretUp weight="bold" className="size-4 text-gray-500" />
        </div>
      </div>
      <div
        onClick={() => navigate(-1)}
        style={{
          marginRight: !match ? "-3.5rem" : 0,
          pointerEvents: !match ? "none" : "auto",
        }}
        className="flex w-12 flex-col items-center py-2 transition-all"
      >
        <div className="size-8 flex-none rounded bg-gradient-to-tr from-blue-900 to-pink-500"></div>
        <div className="min-h-0 flex-1"></div>
        <ArrowLeft weight="bold" className="size-4 text-gray-500" />
        <span className="text-sm text-gray-500">Back</span>
        <div className="min-h-0 flex-1"></div>
        <div className="size-8 flex-none rounded-full bg-gradient-to-br from-red-600 to-amber-600"></div>
      </div>
      <div className="relative min-w-0 flex-1 overflow-clip rounded-xl border border-gray-300 bg-white shadow">
        <div className="size-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
