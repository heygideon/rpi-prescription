import paracetamolSrc from "@/assets/paracetamol.png";
import ibuprofenSrc from "@/assets/ibuprofen.png";
import { trpc } from "@repo/trpc";
import { useParams } from "react-router";

export default function OrderHome() {
  const params = useParams<{ id: string }>();
  const { data: order } = trpc.admin.orders.getOne.useQuery({
    id: parseInt(params.id!),
  });

  if (!order) return null;

  return (
    <>
      <div className="mx-auto max-w-6xl p-8 pt-6">
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold tracking-tight">Locker</h3>
            <div className="mt-3 grid w-full max-w-md grid-cols-4 gap-3">
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">A1</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">A2</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">A3</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">A4</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">B1</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">B2</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">B3</p>
              </div>
              <div className="-m-1 flex flex-col items-center justify-center rounded-md bg-emerald-700 p-4 text-center text-white shadow-sm">
                <p className="text-xl font-semibold">B4</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">C1</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">C2</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">C3</p>
              </div>
              <div className="flex flex-col items-center justify-center rounded-md border border-gray-300 p-4 text-center text-gray-500">
                <p className="text-lg">C4</p>
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-lg font-bold tracking-tight">Order</h3>
            <div className="mt-2 divide-y divide-gray-300 border-y border-gray-300">
              <div className="flex items-center gap-3 py-4">
                <img
                  src={paracetamolSrc}
                  alt=""
                  className="size-16 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Paracetamol
                  </h3>
                  <p className="text-gray-600">500mg capsules</p>
                </div>
              </div>
              <div className="flex items-center gap-3 py-4">
                <img
                  src={ibuprofenSrc}
                  alt=""
                  className="size-16 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    <span className="text-lg text-amber-700">2x</span> Ibuprofen
                  </h3>
                  <p className="text-gray-600">200mg capsules</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-lg font-bold tracking-tight">Timeline</h3>
            <div className="mt-2 pl-2">
              <div className="space-y-4 border-l-2 border-gray-300 py-1">
                <div className="relative -ml-px flex gap-4">
                  <div className="-mx-1.5 mt-1.5 size-3 flex-none rounded-full border-2 border-white bg-emerald-600"></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex-none text-gray-600">
                      <span className="font-medium text-emerald-700">
                        Ready
                      </span>{" "}
                      &middot; Thursday 24/1/25, 15:11
                    </p>
                    <p className="text-lg">Prescription ready</p>
                  </div>
                </div>
                <div className="relative -ml-px flex gap-4">
                  <div className="-mx-1.5 mt-1.5 size-3 flex-none rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex-none text-gray-600">
                      Thursday 24/1/25, 15:10
                    </p>
                    <p className="text-lg">Assigned to locker B4</p>
                  </div>
                </div>
                <div className="relative -ml-px flex gap-4">
                  <div className="-mx-1.5 mt-1.5 size-3 flex-none rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex-none text-gray-600">
                      Tuesday 22/1/25, 13:54
                    </p>
                    <p className="text-lg">
                      Approved by Milky Way Medical Centre
                    </p>
                  </div>
                </div>
                <div className="relative -ml-px flex gap-4">
                  <div className="-mx-1.5 mt-1.5 size-3 flex-none rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex-none text-gray-600">
                      Saturday 19/1/25, 15:10
                    </p>
                    <p className="text-lg">Sent to Milky Way Medical Centre</p>
                  </div>
                </div>
                <div className="relative -ml-px flex gap-4">
                  <div className="-mx-1.5 mt-1.5 size-3 flex-none rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex-none text-gray-600">
                      Saturday 19/1/25, 15:10
                    </p>
                    <p className="text-lg">Approved by this pharmacy</p>
                  </div>
                </div>
                <div className="relative -ml-px flex gap-4">
                  <div className="-mx-1.5 mt-1.5 size-3 flex-none rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="flex-none text-gray-600">
                      Saturday 19/1/25, 11:08
                    </p>
                    <p className="text-lg">Requested by Joe Bloggs</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {order.status === "preparing" && (
        <div className="sticky bottom-0 flex justify-end gap-4 bg-gradient-to-t from-white p-8 pt-0">
          <button className="flex h-12 items-center rounded-full bg-blue-700 px-6 text-white shadow transition hover:bg-blue-800 active:scale-95">
            <span className="text-lg font-semibold">Assign locker</span>
          </button>
        </div>
      )}
      {order.status === "ready" && (
        <div className="sticky bottom-0 flex justify-end gap-4 bg-gradient-to-t from-white p-8 pt-0">
          <button className="flex h-12 items-center rounded-full border border-gray-400 bg-white px-6 text-gray-700 shadow transition hover:bg-gray-200 active:scale-95">
            <span className="text-lg font-semibold">Open locker</span>
          </button>
          <button className="flex h-12 items-center rounded-full bg-emerald-700 px-6 text-white shadow transition hover:bg-emerald-800 active:scale-95">
            <span className="text-lg font-semibold">Dispense</span>
          </button>
        </div>
      )}
    </>
  );
}
