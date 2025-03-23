import StatusTag from "@/components/StatusTag";
import {
  Calendar,
  CaretDown,
  Funnel,
  Info,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { trpc } from "@repo/trpc";
import dayjs from "@/lib/dayjs";
import { Link } from "react-router";

export default function OrdersHome() {
  const { data: orders, isPending } = trpc.admin.orders.getAll.useQuery();

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
        {orders
          ? orders.map((order) => (
              <Link
                key={order.id}
                to={`/orders/${order.id}`}
                className="flex gap-4 px-2 py-3 transition hover:bg-gray-200"
              >
                <span className="w-24 flex-none">#{order.id}</span>
                <span className="w-24 flex-none text-gray-600">
                  {dayjs(order.createdAt).format("DD/MM/YY")}
                </span>
                <span className="w-2/5 flex-auto truncate">
                  {order.user.title} {order.user.firstName}{" "}
                  {order.user.lastName}
                </span>
                <span className="w-3/5 flex-auto truncate">
                  Paracetamol 500mg capsules + 1
                </span>
                <div className="flex w-32 flex-none items-center justify-end">
                  <StatusTag status={order.status} />
                </div>
              </Link>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex h-12 items-center gap-4 px-2">
                <div className="flex w-24 flex-none items-center">
                  <div className="h-4 w-full max-w-8 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex w-24 flex-none items-center">
                  <div className="h-4 w-full max-w-16 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex w-2/5 flex-auto items-center">
                  <div className="h-4 w-full max-w-28 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex w-3/5 flex-auto items-center">
                  <div className="h-4 w-full max-w-36 animate-pulse rounded bg-gray-200"></div>
                </div>
                <div className="flex w-32 flex-none items-center justify-end">
                  <div className="h-6 w-full max-w-20 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
