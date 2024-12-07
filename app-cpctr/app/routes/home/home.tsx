import { StatusTag } from "@/lib/status";
import { queryOptions, useQuery } from "@tanstack/react-query";
import client from "api";
import { Link } from "react-router";

const prescriptionsQuery = queryOptions({
  queryKey: ["prescriptions"],
  queryFn: () =>
    client.prescriptions
      .$get({
        query: {
          status: ["checking", "with_gp", "preparing", "ready"],
        },
      })
      .then((r) => r.json()),
});
const collectedQuery = queryOptions({
  queryKey: ["prescriptions"],
  queryFn: () =>
    client.prescriptions
      .$get({
        query: {
          status: ["collected"],
        },
      })
      .then((r) => r.json()),
});

export default function Home() {
  const { data: orders } = useQuery(prescriptionsQuery);
  const { data: collectedOrders } = useQuery(collectedQuery);

  return (
    <>
      <div className="sticky top-0 bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold tracking-tight">Hey Gideon!</h1>
      </div>
      <div className="space-y-6 p-6">
        <section>
          <h2 className="text-xl font-bold tracking-tight">
            Your prescriptions
          </h2>
          <div className="mt-3 space-y-3">
            {orders ? (
              orders.map(({ user, ...order }) => (
                <Link
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
        <section>
          <h2 className="text-xl font-bold tracking-tight">
            Past prescriptions
          </h2>
          <div className="mt-3 space-y-3">
            {collectedOrders ? (
              collectedOrders.map(({ user, ...order }) => (
                <Link
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
