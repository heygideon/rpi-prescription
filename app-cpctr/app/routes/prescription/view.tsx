import {
  ArrowLeft,
  Check,
  Package,
  PaperPlaneRight,
  ShoppingBagOpen,
} from "@phosphor-icons/react";
import type { Route } from "./+types/view";
import { useNavigate, useSearchParams } from "react-router";

import paracetamolSrc from "@/assets/paracetamol.png";
import CollectModal from "./collect.modal";
import { queryOptions, useQuery } from "@tanstack/react-query";
import client from "api";
import { StatusProgress } from "@/lib/status";
import { Transition, TransitionChild } from "@headlessui/react";

const prescriptionQuery = (id: string) =>
  queryOptions({
    queryKey: ["prescriptions", id],
    queryFn: () =>
      client.prescriptions[":id"]
        .$get({
          param: {
            id,
          },
        })
        .then((r) => {
          if (!r.ok) throw new Error(r.statusText);
          return r.json();
        }),
  });

export default function PrescriptionView({ params }: Route.ComponentProps) {
  const { data: order } = useQuery(prescriptionQuery(params.id));
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="sticky top-0 bg-white p-6 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="-m-2 grid p-2 transition active:scale-95 active:opacity-75"
        >
          <ArrowLeft weight="bold" className="size-5" />
        </button>

        {order ? (
          <>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              #{params.id}
            </h1>
            <p className="text-gray-600">Mr John Doe</p>
            <div className="mt-4 pb-6">
              <StatusProgress status={order.status} />
            </div>
          </>
        ) : (
          <>
            <div className="mt-2.5 h-8 w-16 animate-pulse rounded bg-gray-300"></div>
            <div className="mt-1 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
          </>
        )}
      </div>
      <div className="space-y-6 p-6 pb-24">
        {!!order && (
          <>
            <section>
              <h2 className="text-xl font-bold tracking-tight">
                Your pharmacy
              </h2>
              <div className="mt-3 rounded-md border border-gray-300 bg-white p-4 shadow-sm transition active:scale-95 active:opacity-75">
                <h3 className="text-lg font-bold tracking-tight">
                  Cohens Chemist
                </h3>
                <p className="truncate text-sm text-gray-600">
                  4 Privet Drive, Little Whinging, Surrey GU1 3SX
                </p>
                <div className="mt-1.5 flex items-baseline">
                  <span className="text-sm font-semibold text-emerald-700">
                    More info
                  </span>
                  <div className="flex-1"></div>
                  <span className="text-xs text-gray-600">
                    open today until 6pm
                  </span>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold tracking-tight">
                Order details
              </h2>
              <div className="mt-3 space-y-3">
                <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
                  <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                    2
                  </span>
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
                    <div className="mt-1.5 flex items-baseline">
                      <span className="text-sm font-semibold text-emerald-700">
                        Dosage info
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
                  <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                    2
                  </span>
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
                    <div className="mt-1.5 flex items-baseline">
                      <span className="text-sm font-semibold text-emerald-700">
                        Dosage info
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
                  <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                    2
                  </span>
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
                    <div className="mt-1.5 flex items-baseline">
                      <span className="text-sm font-semibold text-emerald-700">
                        Dosage info
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative flex gap-3 rounded-md border border-gray-300 bg-white p-2 shadow-sm transition active:scale-95 active:opacity-75">
                  <span className="absolute left-2 top-2 grid size-8 place-items-center rounded-full bg-gray-300 font-semibold leading-none">
                    2
                  </span>
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
                    <div className="mt-1.5 flex items-baseline">
                      <span className="text-sm font-semibold text-emerald-700">
                        Dosage info
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Transition show={!!order && order.status === "ready"}>
        <div className="pointer-events-none fixed inset-x-0 bottom-0 isolate p-6 pt-0">
          <TransitionChild
            enter="transition"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <div className="mask-gradient absolute inset-0 -z-10 bg-gray-100"></div>
          </TransitionChild>

          <TransitionChild
            enter="transition"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
          >
            <button
              onClick={() => setSearchParams({ collect: "" })}
              className="pointer-events-auto flex h-14 w-full items-center justify-center rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900"
            >
              <span>Collect order</span>
            </button>
          </TransitionChild>
        </div>
      </Transition>
      <CollectModal params={params} />
    </>
  );
}
