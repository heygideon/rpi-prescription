import {
  Calendar,
  CaretDown,
  Funnel,
  Info,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { Link } from "react-router";

export default function OrdersHome() {
  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      <div className="mt-4 flex flex-wrap gap-4">
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <Funnel weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">Date, newest first</span>
          <CaretDown weight="bold" className="ml-1 size-3 text-gray-500" />
        </button>
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <Info weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">All statuses</span>
          <CaretDown weight="bold" className="ml-1 size-3 text-gray-500" />
        </button>
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <Calendar weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">This year</span>
          <CaretDown weight="bold" className="ml-1 size-3 text-gray-500" />
        </button>
        <div className="relative h-10 w-64">
          <MagnifyingGlass
            weight="bold"
            className="absolute left-3 top-3 size-4 text-gray-600"
          />
          <input
            type="text"
            placeholder="Search..."
            id=""
            className="!size-full !pl-8"
          />
        </div>
      </div>
      <div className="-mx-2 mt-6 divide-y divide-gray-300">
        <div className="flex gap-4 px-2 pb-2">
          <span className="w-24 flex-none font-medium text-gray-600">
            Order no
          </span>
          <span className="w-24 flex-none font-medium text-gray-600">Date</span>
          <span className="w-2/5 flex-auto font-medium text-gray-600">
            User
          </span>
          <span className="w-3/5 flex-auto font-medium text-gray-600">
            Info
          </span>
          <span className="w-32 flex-none text-right font-medium text-gray-600">
            Status
          </span>
        </div>
        <Link
          to="/orders/1"
          className="flex gap-4 px-2 py-3 transition hover:bg-gray-200"
        >
          <span className="w-24 flex-none">#16</span>
          <span className="w-24 flex-none text-gray-600">24/1/25</span>
          <span className="w-2/5 flex-auto truncate">Mr Joe Bloggs</span>
          <span className="w-3/5 flex-auto truncate">
            Paracetamol 500mg capsules + 1
          </span>
          <div className="flex w-32 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-amber-200 px-2 py-1.5 text-sm font-semibold leading-none text-amber-700">
              Sent to GP
            </span>
          </div>
        </Link>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="w-24 flex-none">#15</span>
          <span className="w-24 flex-none text-gray-600">22/1/25</span>
          <span className="w-2/5 flex-auto truncate">Mrs Jane Doe</span>
          <span className="w-3/5 flex-auto truncate">
            Paracetamol 500mg capsules + 1
          </span>
          <div className="flex w-32 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-blue-200 px-2 py-1.5 text-sm font-semibold leading-none text-blue-700">
              For preparation
            </span>
          </div>
        </div>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="w-24 flex-none">#14</span>
          <span className="w-24 flex-none text-gray-600">16/1/25</span>
          <span className="w-2/5 flex-auto truncate">Mr John Doe</span>
          <span className="w-3/5 flex-auto truncate">
            Paracetamol 500mg capsules + 1
          </span>
          <div className="flex w-32 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-emerald-200 px-2 py-1.5 text-sm font-semibold leading-none text-emerald-700">
              Ready to collect
            </span>
          </div>
        </div>
        <div className="flex gap-4 px-2 py-3 transition hover:bg-gray-200">
          <span className="w-24 flex-none">#13</span>
          <span className="w-24 flex-none text-gray-600">8/1/25</span>
          <span className="w-2/5 flex-auto truncate">Mr Joe Bloggs</span>
          <span className="w-3/5 flex-auto truncate">
            Paracetamol 500mg capsules + 1
          </span>
          <div className="flex w-32 flex-none items-center justify-end">
            <span className="-my-1.5 rounded bg-gray-300 px-2 py-1.5 text-sm font-semibold leading-none text-gray-700">
              Collected 19/1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
