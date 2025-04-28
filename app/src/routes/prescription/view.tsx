import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate, useParams, useSearchParams } from "react-router";

import paracetamolSrc from "@/assets/paracetamol.png";
import ibuprofenSrc from "@/assets/ibuprofen.png";
import CollectModal from "./collect.modal";
import { StatusProgress, StatusTag } from "@/lib/status";
import { Transition, TransitionChild } from "@headlessui/react";
import { trpc } from "@repo/trpc";
import { useIntersection } from "@mantine/hooks";
import clsx from "clsx";

import { Haptics, ImpactStyle } from "@capacitor/haptics";

export default function PrescriptionView() {
  const params = useParams<{ id: string }>();
  const { data: order } = trpc.prescriptions.getOne.useQuery({
    id: parseInt(params.id!),
  });
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
          <button
            onClick={() => navigate(-1)}
            className="-ml-2 grid p-2 transition active:scale-95 active:opacity-75"
          >
            <ArrowLeft weight="bold" className="size-5 text-gray-600" />
          </button>
          <p className="text-xl font-bold tracking-tight">#{order?.id ?? ""}</p>
          <div className="flex-1"></div>
          {!!order && <StatusTag status={order.status} />}
        </div>
      </div>
      <div className="-mb-6 bg-white pb-6 pt-safe-area-t">
        <div className="relative p-6">
          <button
            onClick={() => navigate(-1)}
            className="-m-2 grid p-2 transition active:scale-95 active:opacity-75"
          >
            <ArrowLeft weight="bold" className="size-5 text-gray-600" />
          </button>

          {order ? (
            <>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                #{order.id}
              </h1>
              <p className="text-gray-600">
                {order.user.title} {order.user.firstName} {order.user.lastName}
              </p>
              <div className="mt-4 pb-6">
                <StatusProgress status={order.status} />
              </div>
            </>
          ) : (
            <>
              <div className="mt-2.5 h-8 w-16 animate-pulse rounded bg-gray-300"></div>
              <div className="mt-1 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
              <div className="h-px"></div>
              <div className="mt-4 pb-6">
                <div className="flex items-center">
                  <div className="h-0.5 w-8 flex-none overflow-clip rounded-r-full bg-gray-300"></div>
                  <div className="size-10 rounded-full border-2 border-gray-300 text-gray-300"></div>
                  <div className="h-0.5 min-w-0 flex-1 overflow-clip bg-gray-300"></div>
                  <div className="size-10 rounded-full border-2 border-gray-300 text-gray-300"></div>
                  <div className="h-0.5 min-w-0 flex-1 overflow-clip bg-gray-300"></div>
                  <div className="size-10 rounded-full border-2 border-gray-300 text-gray-300"></div>
                  <div className="h-0.5 min-w-0 flex-1 overflow-clip bg-gray-300"></div>
                  <div className="size-10 rounded-full border-2 border-gray-300 text-gray-300"></div>
                  <div className="h-0.5 w-8 flex-none overflow-clip rounded-r-full bg-gray-300"></div>
                </div>
              </div>
            </>
          )}
          <div
            ref={ref}
            className="absolute inset-x-0 bottom-14 mb-safe-area-t"
          ></div>
        </div>
      </div>
      <div className="relative isolate min-h-64 overflow-clip rounded-t-xl border-t border-gray-200 bg-gray-100 p-6">
        <div className="space-y-6">
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
                      src={ibuprofenSrc}
                      alt="Ibuprofen"
                      className="size-24"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center">
                      <h3 className="truncate text-lg font-bold tracking-tight">
                        Ibuprofen
                      </h3>
                      <p className="truncate text-sm text-gray-600">
                        200mg capsules
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
      </div>

      {!!order && order.status === "ready" && <div className="h-20"></div>}
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
              onClick={() => {
                Haptics.impact({ style: ImpactStyle.Light });
                setSearchParams({ collect: "" });
              }}
              className="pointer-events-auto flex h-14 w-full items-center justify-center rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900"
            >
              <span>Collect order</span>
            </button>
          </TransitionChild>
          <div className="h-safe-area-b"></div>
        </div>
      </Transition>
      <CollectModal />
    </>
  );
}
