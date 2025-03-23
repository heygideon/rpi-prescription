import paracetamolSrc from "@/assets/paracetamol.png";
import ibuprofenSrc from "@/assets/ibuprofen.png";
import { useIntersection } from "@mantine/hooks";
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { trpc } from "@repo/trpc";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Order() {
  const navigate = useNavigate();
  const { ref, entry } = useIntersection({
    threshold: 1,
  });
  const showHeader = entry ? !entry?.isIntersecting : false;

  const [items, setItems] = useState([0, 0]);

  const order = trpc.prescriptions.new.useMutation({
    onSuccess: (data) => {
      navigate(`/prescription/${data.order.id}`);
    },
  });

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
          <p className="text-xl font-bold tracking-tight">Order</p>
        </div>
      </div>

      <div className="-mb-6 bg-white pb-6 pt-safe-area-t">
        <div className="relative p-6">
          <h1 className="text-3xl font-bold tracking-tight">Order</h1>
          <div
            ref={ref}
            className="absolute inset-x-0 bottom-14 mb-safe-area-t"
          ></div>
        </div>
      </div>
      <div className="relative isolate overflow-clip rounded-t-xl border-t border-gray-200 bg-gray-100 p-6">
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold tracking-tight">
              Your medication
            </h2>
            <div className="mt-3 space-y-3">
              <div className="flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                <img
                  src={paracetamolSrc}
                  alt="Paracetamol"
                  className="size-24"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="truncate text-lg font-bold tracking-tight">
                    Paracetamol
                  </h3>
                  <p className="truncate text-sm text-gray-600">
                    500mg capsules
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <button
                      onClick={() => setItems([items[0] - 1, items[1]])}
                      disabled={items[0] === 0}
                      className="text-emerald-600 transition active:scale-95 active:opacity-75 disabled:text-gray-400"
                    >
                      <MinusCircle className="size-6" />
                    </button>
                    <span className="text-lg font-semibold leading-none">
                      {items[0]}
                    </span>
                    <button
                      onClick={() => setItems([items[0] + 1, items[1]])}
                      disabled={items[0] >= 3}
                      className="text-emerald-600 transition active:scale-95 active:opacity-75 disabled:text-gray-400"
                    >
                      <PlusCircle className="size-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm">
                <img src={ibuprofenSrc} alt="Ibuprofen" className="size-24" />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="truncate text-lg font-bold tracking-tight">
                    Ibuprofen
                  </h3>
                  <p className="truncate text-sm text-gray-600">
                    200mg capsules
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <button
                      onClick={() => setItems([items[0], items[1] - 1])}
                      disabled={items[1] === 0}
                      className="text-emerald-600 transition active:scale-95 active:opacity-75 disabled:text-gray-400"
                    >
                      <MinusCircle className="size-6" />
                    </button>
                    <span className="text-lg font-semibold leading-none">
                      {items[1]}
                    </span>
                    <button
                      onClick={() => setItems([items[0], items[1] + 1])}
                      disabled={items[1] >= 3}
                      className="text-emerald-600 transition active:scale-95 active:opacity-75 disabled:text-gray-400"
                    >
                      <PlusCircle className="size-6" />
                    </button>
                  </div>
                  {/* <p className="mt-1.5 text-sm text-gray-600">
                  last ordered on 4/12
                </p> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-16 isolate mb-safe-area-b p-6 pt-0">
        <div className="mask-gradient absolute inset-0 -z-10 bg-gray-100/50 backdrop-blur"></div>

        <button
          disabled={items[0] + items[1] === 0 || order.isPending}
          onClick={() => order.mutate()}
          className="pointer-events-auto flex h-14 w-full items-center justify-center gap-1.5 rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900 disabled:scale-100 disabled:bg-gray-400"
        >
          <span>
            Request {items[0] + items[1]}{" "}
            {items[0] + items[1] === 1 ? "item" : "items"}
          </span>
          <span className="font-normal">
            £{((items[0] + items[1]) * 9.9).toFixed(2)}
          </span>
        </button>
      </div>
    </>
  );
}
