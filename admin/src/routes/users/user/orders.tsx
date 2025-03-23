import StatusTag from "@/components/StatusTag";
import {
  CaretDown,
  Calendar,
  Funnel,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { trpc } from "@repo/trpc";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";

export default function UserOrders() {
  const params = useParams<{ id: string }>();
  const { data: user } = trpc.admin.users.getOne.useQuery({
    id: parseInt(params.id!),
  });

  if (!user) return null;

  return (
    <div className="p-8 pt-6">
      <div className="flex flex-wrap gap-4">
        <button className="flex h-10 items-center gap-1.5 rounded-md border border-gray-400 px-4 shadow-sm transition hover:bg-gray-200">
          <Funnel weight="bold" className="size-4 text-gray-600" />
          <span className="font-medium text-gray-700">Date, newest first</span>
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
        {user.orders.length > 0 ? (
          user.orders.map((order) => (
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
                {user.title} {user.firstName} {user.lastName}
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
        )}
      </div>
    </div>
  );
}
