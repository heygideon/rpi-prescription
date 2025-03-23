import { trpc } from "@repo/trpc";
import { Outlet, useParams } from "react-router";
import StatusTag from "@/components/StatusTag";

export default function OrderLayout() {
  const params = useParams<{ id: string }>();
  const { data: order, isPending } = trpc.admin.orders.getOne.useQuery({
    id: parseInt(params.id!),
  });

  if (isPending)
    return (
      <div className="mx-auto max-w-6xl p-8">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <div className="mt-0.5 h-8 max-w-8 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-1.5 h-5 max-w-32 animate-pulse rounded bg-gray-300"></div>
          </div>
          <div className="h-7 w-32 flex-none animate-pulse rounded bg-gray-300"></div>
        </div>
      </div>
    );
  if (!order) return null;

  return (
    <>
      <div className="border-b border-gray-300">
        <div className="mx-auto max-w-6xl p-8 pb-6">
          <div className="flex gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-3xl font-bold tracking-tight">#{order.id}</h2>
              <div className="mt-0.5 flex items-center">
                <span className="text-gray-600">for</span>
                <span className="mx-1.5 grid size-5 place-items-center rounded-full bg-cyan-700 align-middle text-white">
                  <span className="text-[10px] font-medium leading-none">
                    {order.user.firstName.charAt(0)}
                    {order.user.lastName.charAt(0)}
                  </span>
                </span>
                <span>
                  {order.user.title} {order.user.firstName}{" "}
                  {order.user.lastName}
                </span>
              </div>
            </div>
            <StatusTag
              status={order.status}
              className="h-fit !text-base !leading-none"
            />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
