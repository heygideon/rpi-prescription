import {
  Basket,
  CaretDown,
  CaretUp,
  ClipboardText,
  Door,
  House,
  Users,
} from "@phosphor-icons/react";
import { Link, Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="flex h-full gap-2 bg-gray-100 p-2">
      <div className="flex w-64 flex-none flex-col p-4">
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
        <div className="flex flex-1 flex-col space-y-4">
          <div className="relative flex items-center gap-1.5">
            <div className="absolute inset-y-1 -left-6 w-[3px] rounded-r-full bg-emerald-700"></div>
            <House weight="fill" className="size-6 text-emerald-700" />
            <span className="font-semibold text-emerald-700">Home</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ClipboardText weight="bold" className="size-6 text-gray-500" />
            <span className="font-medium text-gray-600">Orders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users weight="bold" className="size-6 text-gray-500" />
            <span className="font-medium text-gray-600">Users</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Door weight="bold" className="size-6 text-gray-500" />
            <span className="font-medium text-gray-600">Lockers</span>
          </div>
          <div className="min-h-0 flex-1"></div>
          <Link to="/counter" className="flex items-center gap-1.5">
            <Basket weight="bold" className="size-6 text-gray-500" />
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
      <div className="min-w-0 flex-1 overflow-clip rounded-xl border border-gray-300 bg-white shadow">
        <div className="size-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
