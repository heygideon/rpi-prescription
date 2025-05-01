import StatusTag from "@/components/StatusTag";
import { trpc } from "@repo/trpc";
import { useMemo } from "react";
import { Link } from "react-router";
import dayjs, { useDate } from "src/lib/dayjs";

function Greeting() {
  const date = useDate(1000 * 60 * 5);

  const greeting = useMemo(() => {
    const hours = date.hour();
    if (hours >= 6 && hours < 12) {
      return "Good morning";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon";
    } else if (hours >= 18 && hours < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }, [date]);

  return greeting;
}

export default function Home() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: orders, isPending } = trpc.admin.orders.getAll.useQuery();

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <Greeting />, {user?.firstName}
      </h1>
      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-4 lg:grid-cols-4">
          <div className="border-y border-gray-300 py-4">
            <p className="text-gray-600">
              Orders{" "}
              <span className="font-medium text-blue-700">preparing</span>
            </p>
            <p className="mt-1 text-3xl font-medium">12</p>
          </div>
          <div className="border-y border-gray-300 py-4">
            <p className="text-gray-600">Orders this week</p>
            <p className="mt-1 text-3xl font-medium">25</p>
          </div>
          <div className="border-b border-gray-300 py-4 lg:border-y">
            <p className="text-gray-600">Lockers in use</p>
            <p className="mt-1 text-3xl font-medium">
              8 <span className="text-xl text-gray-600">/ 24</span>
            </p>
          </div>
          <div className="border-b border-gray-300 py-4 lg:border-y">
            <p className="text-gray-600">Customers</p>
            <p className="mt-1 text-3xl font-medium">234</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold tracking-tight">Recent orders</h2>
        <div className="-mx-2 mt-4 divide-y divide-gray-300">
          <div className="flex gap-4 px-2 pb-2">
            <span className="w-24 flex-none font-medium text-gray-600">
              Order no
            </span>
            <span className="w-24 flex-none font-medium text-gray-600">
              Date
            </span>
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
          {orders ? (
            orders.length > 0 ? (
              orders.map((order) => (
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
            ) : (
              <p className="px-2 py-3 text-sm text-gray-500">No orders</p>
            )
          ) : (
            Array.from({ length: 3 }).map((_, i) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
