import { StatusTag } from "@/lib/status";
import { useIntersection } from "@mantine/hooks";
import { trpc } from "@repo/trpc";
import clsx from "clsx";
import { Link } from "react-router";

export default function Home() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: orders } = trpc.prescriptions.getAll.useQuery({
    status: ["checking", "with_gp", "preparing", "ready"],
  });
  const { data: collectedOrders } = trpc.prescriptions.getAll.useQuery({
    status: ["collected"],
  });

  const { ref, entry } = useIntersection({
    threshold: 1,
  });
  const showHeader = entry ? !entry?.isIntersecting : false;

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
          <p className="text-xl font-bold tracking-tight">Prescriptions</p>
        </div>
      </div>
      <div className="relative isolate -mb-6 bg-white p-6 pb-12">
        <div className="absolute inset-x-0 top-0 -z-10 h-12 [mask-image:linear-gradient(black,transparent)]">
          <div className="size-full bg-gradient-to-r from-emerald-100 to-teal-100"></div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Hey {user?.firstName}!
        </h1>
        <div ref={ref} className="absolute inset-x-0 bottom-20"></div>
      </div>
      <div className="relative isolate overflow-clip rounded-t-xl border-t border-gray-200 bg-gray-100 p-6">
        <section>
          <h2 className="text-xl font-bold tracking-tight">
            Your prescriptions
          </h2>
          <div className="mt-3 space-y-3">
            {orders ? (
              orders.map(({ user, ...order }) => (
                <Link
                  key={order.id}
                  to={`/prescription/${order.id}`}
                  className="block rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75"
                >
                  <h3 className="text-lg font-bold tracking-tight">
                    #{order.id} / {user.title} {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Paracetamol 500mg capsules + 2
                  </p>
                  <div className="mt-1.5 flex items-baseline">
                    <StatusTag status={order.status} />
                    <div className="flex-1"></div>
                    {/* <span className="text-sm text-red-700">
                    expires in 2 days
                  </span> */}
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-28 animate-pulse rounded-md bg-gray-200"></div>
            )}
          </div>
        </section>
        <section className="mt-6">
          <h2 className="text-xl font-bold tracking-tight">
            Past prescriptions
          </h2>
          <div className="mt-3 space-y-3">
            {collectedOrders ? (
              collectedOrders.map(({ user, ...order }) => (
                <Link
                  key={order.id}
                  to={`/prescription/${order.id}`}
                  className="block rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75"
                >
                  <h3 className="text-lg font-bold tracking-tight">
                    #{order.id} / {user.title} {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Paracetamol 500mg capsules + 2
                  </p>
                  <div className="mt-1.5 flex items-baseline">
                    <StatusTag status={order.status} />
                    <div className="flex-1"></div>
                    {/* <span className="text-sm text-red-700">
                    expires in 2 days
                  </span> */}
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-28 animate-pulse rounded-md bg-gray-200"></div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
