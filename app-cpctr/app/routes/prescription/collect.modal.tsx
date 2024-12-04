import { useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/view";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CaretRight, Lock, MapPin } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clsx from "clsx";

export default function CollectModal({
  params,
}: Pick<Route.ComponentProps, "params">) {
  const [searchParams] = useSearchParams();
  const show = searchParams.has("collect");
  const navigate = useNavigate();

  const [postcode, setPostcode] = useState("");
  const [showUnlock, setShowUnlock] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [{ x }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(
    ({ down, first, last, overflow: [overflowX], movement: [mx] }) => {
      if (first) setIsMouseDown(true);
      if (last) {
        setIsMouseDown(false);
        if (overflowX === 1) {
          // unlock
          console.log(overflowX);
        }
      }
      api.start({ x: down ? mx : 0, immediate: down });
    },
    { bounds: buttonRef },
  );

  return (
    <Transition show={show}>
      <Dialog onClose={() => navigate(-1)} className="relative z-40">
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

        <div className="fixed inset-0 flex flex-col justify-end p-4">
          <TransitionChild
            enter="transition"
            enterFrom="translate-y-16 opacity-0 scale-95"
            enterTo="translate-y-0 opacity-100 scale-100"
            leave="transition"
            leaveFrom="translate-y-0 opacity-100 scale-100"
            leaveTo="translate-y-16 opacity-0 scale-95"
          >
            <DialogPanel className="max-h-full overflow-y-auto overflow-x-clip rounded-lg bg-gray-50 text-center shadow-lg">
              <div className="border-b border-gray-300 bg-white p-4">
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  Collect your prescription
                </DialogTitle>
                <div className="mt-1.5 flex items-center justify-center gap-1.5 text-gray-600">
                  <MapPin className="size-5" />
                  <span className="">Cohens Chemist</span>
                </div>
              </div>

              <div className="grid h-56 grid-cols-1 grid-rows-1">
                <Transition
                  show={!showUnlock}
                  enter="transition delay-75"
                  enterFrom="opacity-0 translate-x-4"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-4"
                >
                  <div className="col-start-1 row-start-1 flex h-full flex-col p-4">
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <h3 className="font-semibold tracking-tight">
                        Enter the last part of your postcode
                      </h3>
                      <div className="mt-2 flex w-full items-center justify-center gap-4">
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
                    </div>

                    <button
                      disabled={postcode.length < 3}
                      onClick={() => setShowUnlock(true)}
                      className="pointer-events-auto mt-4 flex h-14 w-full flex-none items-center justify-center rounded-full bg-emerald-700 font-medium text-white shadow-md transition active:scale-95 active:bg-emerald-900 disabled:bg-gray-400"
                    >
                      <span>Collect</span>
                    </button>
                  </div>
                </Transition>
                <Transition
                  show={showUnlock}
                  enter="transition delay-75"
                  enterFrom="opacity-0 translate-x-4"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-4"
                >
                  <div className="col-start-1 row-start-1 flex h-full flex-col p-4">
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <div className="rounded-lg border-2 border-gray-400 p-4">
                        <p className="text-sm text-gray-600">Locker no.</p>
                        <p className="text-3xl font-semibold tracking-tight">
                          12
                        </p>
                      </div>
                    </div>

                    <div
                      ref={buttonRef}
                      className="pointer-events-auto relative mt-4 flex h-14 w-full flex-none items-center justify-center rounded-full bg-gray-400 font-medium text-white shadow-md"
                    >
                      <animated.div
                        {...bind()}
                        style={{ x }}
                        className="absolute inset-y-0 left-0 aspect-square h-full touch-none p-1.5"
                      >
                        <div className="grid size-full place-items-center rounded-full bg-white shadow">
                          <CaretRight
                            weight="bold"
                            className="size-4 text-gray-600"
                          />
                        </div>
                      </animated.div>
                      <div
                        className={clsx(
                          "flex items-center gap-1.5 transition-opacity",
                          isMouseDown && "opacity-0",
                        )}
                      >
                        <Lock weight="bold" className="size-4" />
                        <span>locked</span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
