import { useNavigate, useParams, useSearchParams } from "react-router";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ArrowDown,
  ArrowRight,
  CellSignalHigh,
  Check,
  Warning,
} from "@phosphor-icons/react";
import { useMemo, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clsx from "clsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "@repo/trpc";
import paracetamolSrc from "@/assets/paracetamol.png";
import {
  BleClient,
  type BleDevice,
  textToDataView,
} from "@capacitor-community/bluetooth-le";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Capacitor } from "@capacitor/core";

function logWithLabel(label: string, value: unknown, color: string) {
  console.log(
    `%c${label}`,
    `color:#fff;font-weight:bold;background-color:${color};border-radius:3px;padding:1px 4px;`,
    value,
  );
}

function StageVerify({ setCode }: { setCode: (code: string) => void }) {
  const [postcode, setPostcode] = useState("");
  const isPostcodeValid = useMemo(
    () => /^\d{1,2}[A-Za-z]{2}$/.test(postcode),
    [postcode],
  );
  const params = useParams<{ id: string }>();

  const {
    mutate: verify,
    isPending,
    error,
  } = trpc.prescriptions.collect.generateCode.useMutation({
    onSuccess: (data) => {
      Haptics.vibrate({ duration: 100 });
      setCode(data.code);
    },
  });

  return (
    <div className="flex h-full flex-col p-6">
      <h3 className="text-center font-semibold tracking-tight">
        Enter the last part of your postcode
      </h3>
      <div className="mt-3 flex w-full items-center justify-center gap-4">
        <span className="text-2xl font-semibold tracking-widest text-gray-600">
          ---
        </span>
        <input
          type="text"
          placeholder="---"
          maxLength={3}
          className="field-sizing-content !h-14 !w-fit min-w-20 text-center text-2xl font-semibold uppercase tracking-widest"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyDown={(e) => {
            if (
              e.key !== "Backspace" &&
              e.key !== "Delete" &&
              !/^[A-Za-z0-9]$/.test(e.key)
            ) {
              e.preventDefault();
            }
          }}
        />
      </div>

      <div className="min-h-0 flex-1"></div>

      <div className="mt-6">
        {error && (
          <div className="mb-2 flex justify-center gap-2 p-2 px-3">
            <Warning weight="bold" className="mt-1 size-4 text-red-700" />
            <p className="font-medium text-red-700">Incorrect postcode</p>
          </div>
        )}

        <button
          disabled={!isPostcodeValid || isPending}
          onClick={() => {
            Haptics.impact({ style: ImpactStyle.Light });
            verify({
              id: parseInt(params.id!),
              postcodeHalf: postcode,
            });
          }}
          className="pointer-events-auto flex h-14 w-full flex-none items-center justify-center rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
        >
          <span>Collect</span>
        </button>
      </div>
    </div>
  );
}

function StageCollect({
  code,
  device,
}: {
  code: string;
  device: BleDevice | null | undefined;
}) {
  const queryUtils = trpc.useUtils();
  const params = useParams<{ id: string }>();

  const {
    data,
    mutate: unlock,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      if (!device) throw new Error("No locker");

      // await queryUtils.client.prescriptions.collect.beforeUnlock.mutate({
      //   id: parseInt(params.id!),
      // });

      const bleConnectTime = performance.now();
      await BleClient.connect(device.deviceId);
      const bleConnectDuration = performance.now() - bleConnectTime;

      logWithLabel("connect", bleConnectDuration.toFixed(1) + "ms", "#0e7490");

      const bleWriteTime = performance.now();
      try {
        await BleClient.write(
          device.deviceId,
          "A07498CA-AD5B-474E-940D-16F1FBE7E8CD",
          "51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B",
          textToDataView(`id:${params.id!};code:${code}`),
        );
      } catch (e) {
        console.error(e);
        throw e;
      }
      const bleWriteDuration = performance.now() - bleWriteTime;

      logWithLabel("write", bleWriteDuration.toFixed(1) + "ms", "#0e7490");

      const bleDisconnectTime = performance.now();
      await BleClient.disconnect(device.deviceId);
      const bleDisconnectDuration = performance.now() - bleDisconnectTime;

      logWithLabel(
        "disconnect",
        bleDisconnectDuration.toFixed(1) + "ms",
        "#0e7490",
      );

      logWithLabel(
        "Total",
        (bleConnectDuration + bleWriteDuration + bleDisconnectDuration).toFixed(
          1,
        ) + "ms",
        "#1d4ed8",
      );

      // return await queryUtils.client.prescriptions.collect.testUnlock.mutate({
      //   id: parseInt(params.id!),
      //   code,
      // });
      return { success: true };
    },
    onSuccess: () => {
      Haptics.vibrate({ duration: 100 });
      queryUtils.prescriptions.invalidate();
    },
    onError: () => {
      api.start({ x: 0, immediate: true });
    },
  });

  const buttonRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [{ x }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, first, last, overflow: [overflowX], movement: [mx] }) => {
      if (first) {
        setIsMouseDown(true);
      }
      if (last) {
        Haptics.impact({ style: ImpactStyle.Light });
        setIsMouseDown(false);
        if (overflowX === 1) {
          unlock();
          return;
        }
      }
      api.start({ x: down ? mx : 0, immediate: down });
    },
    { bounds: buttonRef, enabled: !isPending && !data },
  );

  return (
    <div className="col-start-1 row-start-1">
      <div className="flex h-full flex-col space-y-6 p-6 pb-0">
        <div>
          <h3 className="mb-2 flex items-baseline justify-between text-xl tracking-tight">
            <span className="font-bold">Locker</span>
            <span className="text-lg text-gray-600">B4</span>
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "flex items-center justify-center rounded",
                  i === 7
                    ? "-m-1 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700"
                    : "h-12 border border-gray-300",
                )}
              >
                <span
                  className={clsx(
                    i === 7
                      ? "font-semibold text-white"
                      : "text-sm text-gray-500",
                  )}
                >
                  {["A", "B", "C"][Math.floor(i / 4)] + ((i % 4) + 1)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-xl font-bold tracking-tight">Items</h3>
          <div className="divide-y divide-gray-200 border-t border-gray-200">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="relative flex gap-3 py-2">
                <span className="absolute -left-1 top-1 grid size-6 place-items-center rounded-full bg-gray-300 text-sm font-semibold leading-none">
                  2
                </span>
                <img
                  src={paracetamolSrc}
                  alt="Paracetamol"
                  className="size-16"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <h3 className="truncate text-lg font-semibold tracking-tight">
                    Paracetamol
                  </h3>
                  <p className="truncate text-sm text-gray-600">
                    500mg capsules
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <p className="text-center text-sm italic text-gray-500">
            ready when you are
          </p>
          <ArrowDown className="mx-auto mt-0.5 size-4 text-gray-400" />
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-gray-50 from-50% p-5">
        <div
          ref={buttonRef}
          className={clsx(
            "pointer-events-auto relative h-16 w-full flex-none rounded-full shadow-md transition",
            data ? "bg-emerald-700 text-white" : "bg-gray-500 text-white",
          )}
        >
          {/* @ts-expect-error React 19 not yet supported */}
          <animated.div
            {...bind()}
            style={{ x }}
            className="absolute inset-y-0 left-0 z-10 aspect-square h-full touch-none p-2"
          >
            <div className="grid size-full place-items-center rounded-full bg-white shadow">
              {data?.success ? (
                <Check weight="bold" className="size-4 text-emerald-700" />
              ) : isPending ? (
                <span className="size-4 animate-spin rounded-full border-2 border-transparent border-r-gray-500"></span>
              ) : (
                <ArrowRight weight="bold" className="size-4 text-gray-600" />
              )}
            </div>
          </animated.div>
          <div
            className={clsx(
              "flex size-full items-center justify-center transition-opacity",
              (isMouseDown || isPending) && "opacity-25",
            )}
          >
            {data?.success ? (
              <span className="font-medium">open!</span>
            ) : isPending ? (
              <span>unlocking...</span>
            ) : (
              <span>swipe to unlock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal() {
  const [code, setCode] = useState("");

  const { data: device, isFetching } = useQuery({
    queryKey: ["ble", "device"],
    queryFn: async ({ signal }) => {
      await BleClient.initialize();

      if (Capacitor.getPlatform() === "web") {
        // Cannot scan for devices on web
        return await BleClient.requestDevice({
          services: ["A07498CA-AD5B-474E-940D-16F1FBE7E8CD"],
        });
      } else {
        signal.addEventListener("abort", () => BleClient.stopLEScan());
        return await new Promise<BleDevice>((resolve) => {
          BleClient.requestLEScan(
            {
              services: ["A07498CA-AD5B-474E-940D-16F1FBE7E8CD"],
            },
            async (result) => {
              await BleClient.stopLEScan();
              resolve(result.device);
            },
          );
        });
      }
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <TransitionChild
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      </TransitionChild>

      <div className="fixed inset-0 pb-safe-area-b">
        <div className="flex size-full flex-col justify-end p-2 pt-24">
          <TransitionChild
            enter="transition"
            enterFrom="translate-y-16 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition duration-100"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-16 opacity-0"
          >
            <DialogPanel className="flex h-fit max-h-full flex-col gap-y-2">
              <div className="flex h-12 items-center gap-1.5 overflow-clip rounded-lg bg-white px-4">
                {device && !isFetching ? (
                  <>
                    <CellSignalHigh
                      weight={"fill"}
                      className="size-5 text-lime-600"
                    />
                    <span className="text-sm">{device.name}</span>
                    <div className="flex-1"></div>
                    <span className="-mr-1 rounded-sm border border-gray-200 bg-gray-100 px-1 py-0.5 font-mono text-xs text-gray-500">
                      avocet
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mr-1 grid size-5 animate-spin place-items-center rounded-full border border-transparent border-r-emerald-500">
                      <div className="grid size-3.5 animate-spin place-items-center rounded-full border border-transparent border-r-cyan-500">
                        <div className="grid size-2 animate-spin place-items-center rounded-full border border-transparent border-r-blue-500"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-cyan-700">
                      Looking for locker...
                    </span>
                  </>
                )}
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-clip rounded-lg bg-gray-50 shadow-md">
                <div className="border-b border-gray-200 bg-white p-6 py-4">
                  <DialogTitle className="text-center text-2xl font-bold tracking-tight">
                    Collect your prescription
                  </DialogTitle>
                </div>

                <div className="overflow-y-auto">
                  <div className="grid grid-cols-1 grid-rows-1">
                    <Transition
                      show={!code}
                      enter="transition delay-75"
                      enterFrom="opacity-0 translate-x-4"
                      enterTo="opacity-100 translate-x-0"
                      leave="transition"
                      leaveFrom="opacity-100 translate-x-0"
                      leaveTo="opacity-0 -translate-x-4"
                    >
                      <div className="col-start-1 row-start-1">
                        <StageVerify setCode={(code) => setCode(code)} />
                      </div>
                    </Transition>
                    <Transition
                      show={!!code}
                      enter="transition delay-75"
                      enterFrom="opacity-0 translate-x-4"
                      enterTo="opacity-100 translate-x-0"
                      leave="transition"
                      leaveFrom="opacity-100 translate-x-0"
                      leaveTo="opacity-0 -translate-x-4"
                    >
                      <div className="col-start-1 row-start-1">
                        <StageCollect code={code!} device={device} />
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </>
  );
}

export default function CollectModal() {
  const [searchParams] = useSearchParams();
  const show = searchParams.has("collect");
  const navigate = useNavigate();

  return (
    <Transition show={show}>
      <Dialog onClose={() => navigate(-1)} className="relative z-40">
        <Modal />
      </Dialog>
    </Transition>
  );
}
