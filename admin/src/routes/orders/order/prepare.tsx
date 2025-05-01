import clsx from "clsx";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import paracetamolSrc from "@/assets/paracetamol.png";
import ibuprofenSrc from "@/assets/ibuprofen.png";
import { Check, Lock, LockOpen } from "@phosphor-icons/react";
import { useLongPress } from "react-aria";
import { trpc } from "@repo/trpc";

export default function OrderPrepare() {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [stage, setStage] = useState(0);

  const [confirmedItems, setConfirmedItems] = useState([false, false]);
  const [selectedLocker, setSelectedLocker] = useState<string | null>(null);

  const [lockerOpen, setLockerOpen] = useState(false);
  const { longPressProps } = useLongPress({
    threshold: 600,
    onLongPress: () => {
      setLockerOpen(true);
    },
  });

  const utils = trpc.useUtils();

  const complete = trpc.admin.orders.prepare.useMutation({
    onSuccess: async () => {
      await utils.admin.orders.invalidate();
      await navigate(`/orders/${params.id}`);
    },
  });

  return (
    <div className="divide-y divide-gray-300">
      <section>
        <div className="mx-auto max-w-6xl px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-full border border-gray-300 bg-gray-200">
              <span className="text-sm font-semibold leading-none text-gray-600">
                1
              </span>
            </div>
            <span>Confirm items</span>
          </div>
          <div
            className={clsx(
              "overflow-clip transition-[height] [interpolate-size:allow-keywords]",
              stage === 0 ? "h-auto" : "pointer-events-none h-0 opacity-50",
            )}
          >
            <div className="space-y-3 pt-4">
              <div
                onClick={() =>
                  setConfirmedItems([!confirmedItems[0], confirmedItems[1]])
                }
                className="flex items-center gap-3 rounded-md border border-gray-300 bg-gray-50 p-4 shadow-sm transition active:scale-95"
              >
                <img
                  src={paracetamolSrc}
                  alt=""
                  className="size-12 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Paracetamol
                  </h3>
                  <p className="text-sm text-gray-600">500mg capsules</p>
                </div>
                <div
                  className={clsx(
                    "grid size-6 place-items-center rounded-full border-2 transition",
                    confirmedItems[0]
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 text-gray-400",
                  )}
                >
                  <Check weight="bold" className="size-3" />
                </div>
              </div>
              <div
                onClick={() =>
                  setConfirmedItems([confirmedItems[0], !confirmedItems[1]])
                }
                className="flex items-center gap-3 rounded-md border border-gray-300 bg-gray-50 p-4 shadow-sm transition active:scale-95"
              >
                <img
                  src={ibuprofenSrc}
                  alt=""
                  className="size-12 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    <span className="text-base text-amber-700">2x</span>{" "}
                    Ibuprofen
                  </h3>
                  <p className="text-sm text-gray-600">200mg capsules</p>
                </div>
                <div
                  className={clsx(
                    "grid size-6 place-items-center rounded-full border-2 transition",
                    confirmedItems[1]
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-gray-300 text-gray-400",
                  )}
                >
                  <Check weight="bold" className="size-3" />
                </div>
              </div>
            </div>
            <button
              disabled={!confirmedItems.every(Boolean)}
              onClick={() => setStage(1)}
              className="mt-4 h-10 rounded-md bg-emerald-700 px-4 text-white transition hover:bg-emerald-800 active:scale-95 disabled:scale-100 disabled:bg-gray-400"
            >
              <span className="font-medium">Continue</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-full border border-gray-300 bg-gray-200">
              <span className="text-sm font-semibold leading-none text-gray-600">
                2
              </span>
            </div>
            <span>Choose locker</span>
          </div>
          <div
            className={clsx(
              "overflow-clip transition-[height] [interpolate-size:allow-keywords]",
              stage === 1 ? "h-auto" : "pointer-events-none h-0 opacity-50",
            )}
          >
            <p className="pt-4 text-xl font-semibold tracking-tight">avocet</p>
            <div className="mt-2 grid w-full max-w-lg grid-cols-4 gap-4">
              <div
                onClick={() => setSelectedLocker("A1")}
                className={clsx(
                  "flex flex-col items-center justify-center rounded-md border p-4 text-center shadow-sm ring-blue-600 transition",
                  selectedLocker === "A1"
                    ? "border-blue-600 bg-blue-100 ring-1"
                    : "border-gray-300 bg-gray-100",
                )}
              >
                <p className="text-lg font-semibold">A1</p>
                {selectedLocker === "A1" ? (
                  <p className="text-sm font-medium text-blue-700">Selected</p>
                ) : (
                  <p className="text-sm text-gray-600">Available</p>
                )}
              </div>
              <div
                onClick={() => setSelectedLocker("A2")}
                className={clsx(
                  "flex flex-col items-center justify-center rounded-md border p-4 text-center shadow-sm ring-blue-600 transition",
                  selectedLocker === "A2"
                    ? "border-blue-600 bg-blue-100 ring-1"
                    : "border-gray-300 bg-gray-100",
                )}
              >
                <p className="text-lg font-semibold">A2</p>
                {selectedLocker === "A2" ? (
                  <p className="text-sm font-medium text-blue-700">Selected</p>
                ) : (
                  <p className="text-sm text-gray-600">Available</p>
                )}
              </div>
              <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-4 text-center">
                <p className="text-lg font-semibold text-gray-500">A3</p>
                <p className="text-sm font-medium text-gray-400">not here</p>
              </div>
              <div className="bg-stripes-used flex flex-col items-center justify-center rounded-md border border-gray-300 bg-gray-50 p-4 text-center">
                <p className="text-lg font-semibold text-gray-500">A4</p>
                <p className="text-sm font-medium text-gray-400">not here</p>
              </div>
            </div>
            <button
              disabled={!selectedLocker}
              onClick={() => setStage(2)}
              className="mt-4 h-10 rounded-md bg-emerald-700 px-4 text-white transition hover:bg-emerald-800 active:scale-95 disabled:scale-100 disabled:bg-gray-400"
            >
              <span className="font-medium">Continue</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-full border border-gray-300 bg-gray-200">
              <span className="text-sm font-semibold leading-none text-gray-600">
                3
              </span>
            </div>
            <span>Open locker</span>
          </div>

          <div
            className={clsx(
              "overflow-clip transition-[height] [interpolate-size:allow-keywords]",
              stage === 2 ? "h-auto" : "pointer-events-none h-0 opacity-50",
            )}
          >
            <div
              {...longPressProps}
              className="group mt-4 flex items-center rounded-md border border-gray-300 bg-gray-50 p-4 shadow-sm transition active:border-gray-500"
            >
              <div className="min-w-0 flex-1">
                <p className="font-semibold">A4</p>
                <p className="text-sm text-gray-600">avocet</p>
              </div>
              <div className="relative size-8">
                {lockerOpen ? (
                  <div className="absolute -inset-1">
                    <div className="size-full rounded-full border-2 border-emerald-700"></div>
                  </div>
                ) : (
                  <div className="absolute -inset-1">
                    <div className="group-active:animate-conic-progress size-full rounded-full p-0.5 text-gray-700">
                      <div className="size-full rounded-full bg-gray-50"></div>
                    </div>
                  </div>
                )}
                <div
                  className={clsx(
                    "relative grid size-full place-items-center rounded-full text-white shadow-sm",
                    lockerOpen ? "bg-emerald-700" : "bg-gray-700",
                  )}
                >
                  {lockerOpen ? (
                    <LockOpen weight="bold" className="size-4" />
                  ) : (
                    <Lock weight="bold" className="size-4" />
                  )}
                </div>
              </div>
            </div>
            <p className="mt-2 text-left text-sm font-medium text-blue-700">
              hold to unlock
            </p>
            <button
              disabled={
                !confirmedItems.every(Boolean) ||
                complete.isPending ||
                !selectedLocker
              }
              onClick={() =>
                complete.mutate({
                  id: parseInt(params.id!),
                  lockerNo: selectedLocker!,
                })
              }
              className="mt-4 h-10 rounded-md bg-emerald-700 px-4 text-white transition hover:bg-emerald-800 active:scale-95 disabled:scale-100 disabled:bg-gray-400"
            >
              <span className="font-medium">Finish</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
